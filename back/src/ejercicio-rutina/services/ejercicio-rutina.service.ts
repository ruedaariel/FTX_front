import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EjercicioRutinaEntity } from '../entities/ejercicio-rutina.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from '../../config/error.manager';

@Injectable()
export class EjercicioRutinaService {

  constructor(@InjectRepository(EjercicioRutinaEntity) private readonly ejercicioRutinaRepository: Repository<EjercicioRutinaEntity>) { }

  public async updateEjHecho(id: number, ejHecho: boolean): Promise<boolean> {

    try {
      const unEjercicio = await this.ejercicioRutinaRepository.findOneBy({ idEjercicioRutina: id });

      if (!unEjercicio) {
        throw new ErrorManager("BAD_REQUEST", `No se encontro el ejercicio id ${id}`)
      }
      unEjercicio.ejercicioHecho = ejHecho;
      this.ejercicioRutinaRepository.save(unEjercicio);
      return true;
    } catch (err) {
      throw ErrorManager.handle(err)
    }

  }


}
