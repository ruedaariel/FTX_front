import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CreatePagoDto, IniciarPagoDto } from '../dto/create-pago.dto';
import { PagoEntity, METODODEPAGO } from '../entity/pago.entity';
import { UsuarioEntity } from '../../usuario/entities/usuario.entity';
import { MercadoPagoService } from './mercadopago.service';
import { calcularFechaVencimiento } from '../../utils/transformar-fecha';
import { ErrorManager } from 'src/config/error.manager';
import { RtaPagoDto } from '../dto/rta-pago.dto';
import { plainToInstance } from 'class-transformer';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { RtaImpagosDto } from '../dto/rta-impagos-dto';

@Injectable()
export class PagosService {
  constructor(
    private readonly mpService: MercadoPagoService,
    @InjectRepository(PagoEntity)
    private readonly pagoRepository: Repository<PagoEntity>,
    private readonly usuarioService: UsuarioService,
    @InjectRepository(UsuarioEntity) //lo uso para la query
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) { }

  async iniciarPago(iniciarPagoDto: IniciarPagoDto) {
    // 1. Crear preferencia en MercadoPago con datos del frontend
    const mpResponse = await this.mpService.crearPreferencia(iniciarPagoDto);

    // 2. Mapear respuesta de MercadoPago al DTO para BD
    const createPagoDto: CreatePagoDto = {
      fechaPago: mpResponse.date_created,
      estado: 'pending', // Estado inicial de una preferencia
      monto: mpResponse.items?.[0]?.unit_price || iniciarPagoDto.monto,
      preferenciaId: mpResponse.id,
      external_reference: mpResponse.external_reference,

      // Datos que vienen del frontend original
      diasAdicionales: iniciarPagoDto.diasAdicionales,
      metodoDePago: iniciarPagoDto.metodoDePago,
      usuarioId: iniciarPagoDto.usuarioId,
    };

    // 3. Guardar en la base de datos usando el DTO con datos de MercadoPago
    const pagoGuardado = await this.guardarPago(createPagoDto);

    // 4. Retornar respuesta al frontend
    return {
      estado: createPagoDto.estado,
      init_point: mpResponse.init_point,
      preferenciaId: mpResponse.id,
      pagoId: pagoGuardado.idPagos,
    };
  }

  public async guardarPago(createPagoDto: CreatePagoDto): Promise<PagoEntity> {
    // Buscar el usuario para la relación
    const usuario = await this.usuarioService.findUsuarioById(createPagoDto.usuarioId);

    if (!usuario) {
      throw new Error(
        `Usuario con ID ${createPagoDto.usuarioId} no encontrado`,
      );
    }
    const fPago = createPagoDto.fechaPago
      ? new Date(createPagoDto.fechaPago)
      : new Date();
    const fVencimiento = calcularFechaVencimiento(fPago, true); /*fechaPagoEsDateOnly=*/
   //es un plan gratis, el vencimiento es a 15 dias
    if (createPagoDto.monto === 0) {
      fVencimiento.setDate(fPago.getDate()+15)
    }
    const pago = this.pagoRepository.create({
      fechaPago: fPago,
      fechaVencimiento: fVencimiento,
      estado: createPagoDto.estado,
      diasAdicionales: createPagoDto.diasAdicionales,
      metodoDePago: createPagoDto.metodoDePago,
      monto: createPagoDto.monto,
      referencia: createPagoDto.external_reference,
      usuario: usuario,
    });
    return await this.pagoRepository.save(pago);
  }

  async guardarPagoManual(createPagoDto: CreatePagoDto): Promise<PagoEntity> {
    // Validar que sea un pago manual válido
    if (
      ![METODODEPAGO.TRANSFERENCIA, METODODEPAGO.EFECTIVO].includes(
        createPagoDto.metodoDePago,
      )
    ) {
      throw new Error('Método de pago no válido para registro manual');
    }

    if (createPagoDto.estado !== 'approved') {
      throw new Error('Los pagos manuales deben estar aprobados');
    }

    return await this.guardarPago(createPagoDto);
  }

  //obtener todos los pagos
  async obtenerTodosLosPagos(): Promise<RtaPagoDto[]> {
    const pagos = await this.pagoRepository.find({ relations: ['usuario', 'usuario.datosPersonales'], order: { fechaPago: 'DESC' } });
    console.log("entro a obtener todos los pagos");
    const pagosDto = plainToInstance(RtaPagoDto, pagos, { excludeExtraneousValues: true });
    console.log("paso plaintoinstance en pagos");
    return pagosDto;
  }

  async obtenerImpagos(): Promise<RtaImpagosDto[]> {
    const fechaFin = new Date();
    fechaFin.setHours(0,0,0,0);
    const fechaInicio = new Date(fechaFin);
    fechaInicio.setFullYear(fechaInicio.getFullYear()-1);

    
    const subQ = this.pagoRepository.createQueryBuilder('p_sub')
      .select('p_sub.usuarioId', 'usuarioId') //selecciona la columna usuarioId y la renombra
      .addSelect('MAX(p_sub.fechaVencimiento)', 'lastVencimiento') //selecciona la ultima fechaVencimiento y la renombra
      .groupBy('p_sub.usuarioId'); //agrupa por usuario para ver el MAX

    // join del subquery con la tabla usuario para traer columnas del usuario
    const usuariosConDeuda = await this.usuarioRepository.createQueryBuilder('u')
      .innerJoin(
        '(' + subQ.getQuery() + ')',
        't', //alias de la subconsulta
        't.usuarioId = u.id' //join entre la subconsulta y la tabla usuario
      )
      // unir con la tabla pagos para traer la fila que coincide con lastVencimiento
      .innerJoin('pago', 'p', 'p.usuarioId = t.usuarioId AND p.fechaVencimiento = t.lastVencimiento')
      // unir con datosPersonales (1:1)
      .leftJoin('u.datosPersonales', 'dp')
      .setParameters(subQ.getParameters())
      .where('t.lastVencimiento >= :fechaInicio AND t.lastVencimiento < :fechaFin', { fechaInicio, fechaFin })
      .andWhere('u.rol = :rol', { rol: 'usuario' })
      .select([
        'u.id AS usuarioId',
        'u.estado AS estadoUsuario',
        'dp.nombre AS nombre',
        'dp.apellido AS apellido',
        'p.idPagos AS idPagos',
        'p.fechaPago AS fechaPago',
        'p.fechaVencimiento AS fechaVencimiento',
        'p.metodoDePago AS metodoDePago',
        'p.monto AS monto'
      ]).getRawMany();//Ejecuta la consulta y devuelve filas

    const nuncaPagaron = await this.usuarioRepository.createQueryBuilder('u')
      .leftJoin('u.pagos', 'p') // buscamos relacion null (nunca pagaron)
      .leftJoin('u.datosPersonales', 'dp')           // traer nombre/apellido
      .leftJoin('dp.plan', 'pl') // para filtrar por plan gratuito
      .where('p.usuarioId IS NULL') // sin pagos
      .andWhere('(pl.precio IS NULL OR pl.precio > 0)') // excluir planes gratuitos 
      .andWhere('u.rol = :rol', { rol: 'usuario' })
      .select([
        'u.id AS usuarioId',
        'u.estado AS estadoUsuario',
        'dp.nombre AS nombre',
        'dp.apellido AS apellido',
        'NULL AS idPagos',
        'NULL AS fechaPago',
        'NULL AS fechaVencimiento',
        'NULL AS metodoDePago',
        'NULL AS monto'
      ])
      .getRawMany();
      console.log(nuncaPagaron);
    const combinado = [...usuariosConDeuda, ...nuncaPagaron];

    // ordenar: primero por fechaVencimiento descendente; los NULL (never paid) al final
    combinado.sort((a, b) => {
      const aDate = a.fechaVencimiento ? new Date(a.fechaVencimiento).getTime() : null;
      const bDate = b.fechaVencimiento ? new Date(b.fechaVencimiento).getTime() : null;

      if (aDate === null && bDate === null) return 0;
      if (aDate === null) return 1;   // a al final
      if (bDate === null) return -1;  // b al final
      return bDate - aDate;           // descendente
    });
    const pagosDto = plainToInstance(RtaPagoDto, combinado, { excludeExtraneousValues: true });

    return pagosDto;
  }
  //obtener un pago por su ID
  /*  async obtenerPagoPorId(id: number): Promise<PagoEntity> {
     const pago = await this.pagoRepository.findOne({
       where: { idPagos: id },
       relations: ['usuario'],
     });
     if (!pago) {
       throw new Error(`Pago con ID ${id} no encontrado`);
     }
     return pago;
   } */

  //eliminar un pago por su ID
  async eliminarPago(id: number): Promise<void> {
    await this.pagoRepository.delete(id);
  }

  // Método para webhook: actualizar con datos frescos de MercadoPago
  async actualizarEstadoPago(datosMercadoPago: any) {
    // Buscar el pago existente por external_reference o preferenciaId
    const pagoExistente = await this.pagoRepository.findOne({
      where: {
        usuario: {
          id: parseInt(
            datosMercadoPago.external_reference?.replace('usuario-', ''),
          ),
        },
      },
      relations: ['usuario'],
    });

    if (pagoExistente) {
      // Actualizar solo los campos que vienen de MercadoPago
      pagoExistente.estado = datosMercadoPago.status;
      pagoExistente.fechaPago = datosMercadoPago.date_approved
        ? new Date(datosMercadoPago.date_approved)
        : pagoExistente.fechaPago;
      pagoExistente.monto =
        datosMercadoPago.transaction_amount || pagoExistente.monto;

      return await this.pagoRepository.save(pagoExistente);
    }

    throw new Error(`Pago no encontrado para los datos de MercadoPago`);
  }

  public async findPagosxId(id: number): Promise<PagoEntity[]> {
    try {

      const unUsuario = await this.usuarioService.findUsuarioById(id);
      if (!unUsuario) {
        throw new ErrorManager("BAD_REQUEST", "Usuario inexistente");
      }

      if (unUsuario.rol !== "usuario") {
        throw new ErrorManager("BAD_REQUEST", "No es un cliente");
      }

      const pagos = await this.pagoRepository.find({
        where: { usuarioId: unUsuario.id },
        order: { fechaPago: 'DESC' } // o la columna que define "último"
      });


      return pagos
    } catch (error) {
      throw ErrorManager.handle(error)
    }


  }


}
