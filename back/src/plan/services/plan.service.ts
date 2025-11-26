import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PlanEntity } from '../entities/plan.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ErrorManager } from '../../config/error.manager';
import { DatosPersonalesEntity } from '../../usuario-datos-personales/entities/datos-personales.entity';
import { CreateHistoricoPlanDto } from '../dto/create-historico-plan.dto';
import { HistoricoPlanEntity } from '../entities/historico-plan.entity';
import { ESTADO } from '../../constantes/estado.enum';
import { plainToInstance } from 'class-transformer';
import { PlanRtaDto } from '../dto/plan-rta.dto';
import { PlanRtaCompletaDto } from '../dto/plan-rta-completa.dto';

@Injectable()
export class PlanService {
  constructor(@InjectRepository(PlanEntity) private readonly planRepository: Repository<PlanEntity>,
    @InjectRepository(DatosPersonalesEntity) private readonly datosPersonalesRepository: Repository<DatosPersonalesEntity>,
    @InjectRepository(HistoricoPlanEntity) private readonly historicoPlanRepository: Repository<HistoricoPlanEntity>,
    @InjectEntityManager() private readonly entityManager: EntityManager,) { }

  public async create(planDto: CreatePlanDto): Promise<PlanRtaCompletaDto> {
    try {
      //controlo que no exista plan con igual nombre
      const planExistente = await this.planRepository.findOneBy({ nombrePlan: planDto.nombrePlan });
      if (planExistente) {
        throw new ErrorManager("CONFLICT", `El nombre del plan ${planDto.nombrePlan} ya existe en la base de datos`)
      }

      // //convercion de fecha y validacion
      // const fechaValida = new Date(planDto.fCambio);
      // if (isNaN(fechaValida.getTime())) {
      //   throw new ErrorManager("BAD_REQUEST", "La fecha de cambio de precio no es válida");
      // }
      const planNuevo = this.planRepository.create(planDto);
      const plan = await this.planRepository.save(planNuevo);

      return plainToInstance(PlanRtaCompletaDto, plan)
    } catch (error) {
      throw ErrorManager.handle(error);
    }
  }

  //busca todos los planes. Formato completo
  public async findAll(): Promise<PlanRtaCompletaDto[]> {
    const planes = await this.planRepository.find();
    return plainToInstance(PlanRtaCompletaDto, planes)
  }

  public async findOneById(id: number): Promise<PlanEntity | null> {
    try {
      const unPlan = await this.planRepository.findOneBy({ idPlan: id });
      if (!unPlan) {
        return null
      }
      return unPlan;
    } catch (error) {
      throw ErrorManager.handle(error);
    }
  }

  public async update(id: number, updatePlanDto: UpdatePlanDto): Promise<PlanRtaCompletaDto> {
    try {
      return await this.entityManager.transaction(async (transaccion) => {
        //valida si existe el plan

        const planExistente = await transaccion.findOneBy(PlanEntity, { idPlan: id });
        if (!planExistente) {
          throw new ErrorManager("CONFLICT", `El plan ${id} no existe`);
        }

        const planViejo = { ...planExistente };
        let camposModif: string[] = [];

        Object.keys(updatePlanDto).forEach(clave => {
          if (updatePlanDto[clave] !== undefined && updatePlanDto[clave] !== null) {
            planExistente[clave] = updatePlanDto[clave];
            camposModif.push(clave)
          }
        });

        //no se guarda nada si no hay cambios
        if (camposModif.length === 0) {
          return planExistente;
        }

        const planActualizado = await transaccion.save(PlanEntity, planExistente);
        const historico = transaccion.create(HistoricoPlanEntity, {
          idPlanOrigen: planViejo.idPlan,
          nombrePlan: planViejo.nombrePlan,
          descripcion: planViejo.descripcion,
          precio: planViejo.precio,
          fCambioInicio: planViejo.fCambio, // O la fecha de inicio del plan
          detalleCambio: camposModif.join(';'),
          beneficios : planViejo.beneficios,
          plan: planExistente,
          noIncluye : planViejo.noIncluye,
          level : planViejo.level
        });
        await transaccion.save(HistoricoPlanEntity, historico);


        return plainToInstance(PlanRtaDto, planActualizado); //transforma un objeto plano a una clase;
      })
    } catch (error) {
      throw ErrorManager.handle(error);
    }
  }

  //Se aplica borrado fisico, pero se guarda el registro en un Historico. No se borra el plan si hay usuarios Activos o Inactivos.
  //Si el plan esta vinculado a usuarios borrados (Archivados), se borra.
  public async remove(id: number): Promise<Boolean> {
    try {
      return await this.entityManager.transaction(async (transaccion) => {
        //valida si existe el plan
        const planExistente = await transaccion.findOneBy(PlanEntity, { idPlan: id });
        if (!planExistente) {
          throw new ErrorManager("CONFLICT", `El plan ${id} no existe`);
        }

        //controla si hay usuarios activos vinculados al plan
        const usuariosActivos = await transaccion.count(DatosPersonalesEntity, {
          where: {
            plan: { idPlan: id },
            estado: ESTADO.ACTIVO,
          },
        });
        if (usuariosActivos > 0) {
          throw new ErrorManager("CONFLICT", `Existen ${usuariosActivos} activos con ese plan, no se puede eliminar el plan ${id}`)
        }

        //controla si hay usuarios inactivos vinculados al plan
        const usuariosInactivos = await transaccion.count(DatosPersonalesEntity, {
          where: {
            plan: { idPlan: id },
            estado: ESTADO.INACTIVO,
          },
        });
        if (usuariosInactivos > 0) {
          throw new ErrorManager("CONFLICT", `Existen ${usuariosInactivos} usuarios inactivos con ese plan, no se puede eliminar el plan ${id}. Se aconseja borrar a esos usuarios para dar de baja el plan`);
        }

        //desvincular la relacion si hay usuarios "archivados" (borrados)
        await transaccion.update(DatosPersonalesEntity,
          {
            plan: { idPlan: id },
            estado: ESTADO.ARCHIVADO,
          },
          { plan: null }
        );

        //se carga en historico
        const historico = transaccion.create(HistoricoPlanEntity, {
          idPlanOrigen: planExistente.idPlan,
          nombrePlan: planExistente.nombrePlan,
          descripcion: planExistente.descripcion,
          beneficios: planExistente.beneficios,
          precio: planExistente.precio,
          noIncluye: planExistente.noIncluye,
          level: planExistente.level,
          fCambioInicio: planExistente.fCambio, // O la fecha de inicio del plan
          detalleCambio: `Eliminación del plan ${planExistente.nombrePlan}, id: ${id}`,
          plan: null
        });

        await transaccion.save(HistoricoPlanEntity, historico);

        //borrado de plan
        const resultado = await transaccion.delete(PlanEntity, id);

        return resultado.affected === 1

      });


    } catch (error) {
      throw ErrorManager.handle(error);
    }

  }

  public async createHistorico(planDto: CreateHistoricoPlanDto): Promise<HistoricoPlanEntity> {
    try {
      const historicoNuevo = this.historicoPlanRepository.create(planDto);
      return this.historicoPlanRepository.save(historicoNuevo);
    } catch (error) {
      throw ErrorManager.handle(error);
    }

  }
}
