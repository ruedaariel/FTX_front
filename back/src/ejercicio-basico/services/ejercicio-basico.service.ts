import { Injectable } from '@nestjs/common';
import { CreateEjercicioBasicoDto } from '../dto/create-ejercicio-basico.dto';
import { UpdateEjercicioBasicoDto } from '../dto/update-ejercicio-basico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EjercicioBasicoEntity } from '../entities/ejercicio-basico.entity';
import { Not, Repository } from 'typeorm';
import { ErrorManager } from '../../config/error.manager';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { normalizarSinEspacios } from '../../utils/normalizar-string';
import { FileImgService } from '../../shared/file-img/file-img.service';
import { RtaNombreEjercicioBasicoDto } from '../dto/rta-nombre-ejercicio-basico.dto';
import { plainToInstance } from 'class-transformer';
import { RtaEjercicioBasicoDto } from '../dto/rta-ejercicio-basico.dto';


@Injectable()
export class EjercicioBasicoService {

  constructor(@InjectRepository(EjercicioBasicoEntity) private readonly ejercicioBasicoRepository: Repository<EjercicioBasicoEntity>,
    private readonly configService: ConfigService,
    private readonly fileImgService: FileImgService) { }

  async createEjercicioBasico(ejercicioBasicoDto: CreateEjercicioBasicoDto): Promise<RtaEjercicioBasicoDto> {
    try {
      //controlo si ya existe (por nombre)
      const ejercicioGuardado = await this.existName(ejercicioBasicoDto.nombreEjercicio);

      if (!ejercicioGuardado) {
        //se guarda y se controla si se creo
        const nuevoEjercicioBasico = Object.assign(new EjercicioBasicoEntity(), ejercicioBasicoDto);
        const ejercicioCreado = await this.ejercicioBasicoRepository.save(nuevoEjercicioBasico);
        // if (!ejercicioCreado) {
        //   throw new ErrorManager("BAD_REQUEST", "no se pudo crear ejercicio")
        // }
        //para ver que trae

        //VER SI ANDA CON EL TRANSFORM DEL DTO
        // ejercicioCreado.imagenLink = this.fileImgService.construirUrlImagen(ejercicioCreado.imagenLink, "ejercicios");
console.log("ejercicio Creado --->", ejercicioCreado);
        const rtaEjercicioDto = plainToInstance(RtaEjercicioBasicoDto, ejercicioCreado, { excludeExtraneousValues: true });
        console.log("ejercicio RTA --->", rtaEjercicioDto);
        return rtaEjercicioDto //es enviado con solo el nombre de la imagen, no la url completa
      } else {
        throw new ErrorManager("BAD_REQUEST", "ya existe el mismo nombre de ejercicio")
      }

    } catch (err) {
      throw ErrorManager.handle(err);
    }

  }

  public async findByName(nombreEj: string): Promise<RtaEjercicioBasicoDto> {
    try {

      const unEjercicio = await this.ejercicioBasicoRepository.findOne({ where: { nombreEjercicio: normalizarSinEspacios(nombreEj) }, });

      if (!unEjercicio) {
        throw new ErrorManager("BAD_REQUEST", `no se encontró ejercicio con nombre ${nombreEj}`);
      }

      //VER SI ANDA CON EL TRANSFORM DEL DTO
      // unEjercicio.imagenLink = this.fileImgService.construirUrlImagen(unEjercicio.imagenLink, "ejercicios");

      const rtaEjercicioDto = plainToInstance(RtaEjercicioBasicoDto, unEjercicio, { excludeExtraneousValues: true });
      return unEjercicio;
    } catch (err) {
      throw ErrorManager.handle(err)
    }

  }

  public async existName(nombreEj: string): Promise<boolean> {
    try {
      const unEjercicio = await this.ejercicioBasicoRepository.findOne({ where: { nombreEjercicio: normalizarSinEspacios(nombreEj) }, });
      if (!unEjercicio) {
        return false;
      }
      return true;
    } catch (err) {
      throw ErrorManager.handle(err)
    }

  }

  public async remove(id: number): Promise<boolean> {
    //borra el ejercicio (hard delete) pero deberia primero verificar si no existe algun ejercicioRutina que esté relacionado con este ejercicio
    //en ese caso, no deberia dejarlo borrar
    try {
      //controlo que exista
      const ejercicioGuardado = await this.ejercicioBasicoRepository.findOne({
        where: { idEjercicioBasico: id },
        relations: ['ejerciciosRutina']
      });
      if (!ejercicioGuardado) {
        throw new ErrorManager("BAD_REQUEST", "No se encontro el ejercicio");
      }

      //tiene relaciones activas
      if (ejercicioGuardado.ejerciciosRutina && ejercicioGuardado.ejerciciosRutina.length > 0) {
        throw new ErrorManager("CONFLICT", "No se puede borrar el ejercicio, \n hay rutinas que estan utilizando")
      }
      //borro el ejercicio
      const ejercicioBorrado = await this.ejercicioBasicoRepository.delete({ idEjercicioBasico: id });
      if (ejercicioBorrado.affected === 0) {
        throw new ErrorManager("BAD_REQUEST", "No se borro el ejercicio");
      }

      //borro la imagen del ejercicio de uploads/ejercicios
      if (ejercicioGuardado.imagenLink) {
        const imgBorrada = await this.fileImgService.borrarImagen(ejercicioGuardado.imagenLink, "ejercicios");
        if (imgBorrada) {
          console.log(`se borro la imagen del ejercicio ${id}, ${ejercicioGuardado.imagenLink}`);
        } else {
          console.log(`No existe la imagen ${ejercicioGuardado.imagenLink}`)
        }
      }

      return true;
    } catch (err) {
      throw ErrorManager.handle(err);
    }
    //el borrado es fisico, pero si esta conectado a rutina, no se podrá borrar. Cuanto se establezcan las relaciones, hacer.
  }

  public async findOne(id: number): Promise<RtaEjercicioBasicoDto> {
    try {
      const unEjercicio = await this.ejercicioBasicoRepository.findOneBy({ idEjercicioBasico: id });
      if (!unEjercicio) {
        throw new ErrorManager("BAD_REQUEST", `No se encontro el ejercicio id ${id}`);
      }
      //ojo, recordar que estoy modificando el campo imagenLink, aunque NO en la b/d
      //VER SI ANDA CON EL TRANSFORM DEL DTO
      //unEjercicio.imagenLink = this.fileImgService.construirUrlImagen(unEjercicio.imagenLink, "ejercicios");

      //ATENCION: EL PLAINTOINSTANCE ME HACE PASAR 2 VECES POR EL TRANSFORM del DTO 
// (tengo en el main el ClassSerializerInterceptor y el ValidationPipe con transform: true, lo cual
//  debería aplicar los decoradores como @Expose() y @Transform() automaticamente)
     const rtaEjercicioDto = plainToInstance(RtaEjercicioBasicoDto, unEjercicio, { excludeExtraneousValues: true });
     return rtaEjercicioDto;
    
    } catch (err) {
      throw ErrorManager.handle(err);
    }
  }

  public async findAll(): Promise<RtaEjercicioBasicoDto[]> {
    try {
      const ejercicios = await this.ejercicioBasicoRepository.find({
        order: {nombreEjercicio : 'ASC'}
      });
      //ojo, recordar que estoy modificando el campo imagenLink, aunque NO en la b/d
      // ejercicios.forEach(ej => { ej.imagenLink = this.fileImgService.construirUrlImagen(ej.imagenLink, "ejercicios"); });
     const rtaEjerciciosDto = plainToInstance(RtaEjercicioBasicoDto, ejercicios, { excludeExtraneousValues: true });
      return rtaEjerciciosDto;
    } catch (err) {
      throw ErrorManager.handle(err);
    }

  }

  public async findAllNames(): Promise<RtaNombreEjercicioBasicoDto[]> {
    try {
      const ejercicios = await this.ejercicioBasicoRepository.find();

      return plainToInstance(RtaNombreEjercicioBasicoDto, ejercicios, { excludeExtraneousValues: true });
    } catch (err) {
      throw ErrorManager.handle(err);
    }

  }


  public async update(id: number, updateEjercicioBasicoDto: UpdateEjercicioBasicoDto): Promise<RtaEjercicioBasicoDto> {
    try {
      //busco el ejercicio a actualizar
      const ejercicioGuardado = await this.ejercicioBasicoRepository.findOneBy({ idEjercicioBasico: id });
      if (!ejercicioGuardado) {
        throw new ErrorManager("BAD_REQUEST", `No se encuentra ejercicio id ${id}`);
      }

      //si modifico el nombre, busco que no exista otro con el mismo nombre
      if (updateEjercicioBasicoDto.nombreEjercicio) {
        const ejercicioControl = await this.ejercicioBasicoRepository.findOne({
          where:
            { nombreEjercicio: updateEjercicioBasicoDto.nombreEjercicio, idEjercicioBasico: Not(id), } //como estoy actualizando busco si ya existe este nuevo nombre, pero que sea de distinto id
        });
        if (ejercicioControl) {
          throw new ErrorManager("BAD_REQUEST", "Nombre del ejercicio duplicado");
        }
      };

      //si modifico la imagen, debo borrar la imagen anterior
      let borrarImg: boolean = false;
      let nombreImgAborrar = "";
      if (updateEjercicioBasicoDto.imagenLink && ejercicioGuardado.imagenLink &&
        updateEjercicioBasicoDto.imagenLink !== ejercicioGuardado.imagenLink) {
        nombreImgAborrar = ejercicioGuardado.imagenLink
        borrarImg = true
      };

      //comienzo el update
      Object.assign(ejercicioGuardado, updateEjercicioBasicoDto);
      const ejercicioModif = await this.ejercicioBasicoRepository.save(ejercicioGuardado);
      if (!ejercicioModif) {
        throw new ErrorManager("BAD_REQUEST", `No se pudo guardar la modificacion del ejercicio id ${id}`);
      }
      //ya modifiqué el ejercicio ->borro la imagen vieja
      if (borrarImg) {
        const imgBorrada = await this.fileImgService.borrarImagen(nombreImgAborrar, "ejercicios");
        if (imgBorrada) {
          console.log(`se borro la imagen del ejercicio ${id}, ${ejercicioGuardado.imagenLink}`);
        } else {
          console.log(`No existe la imagen ${ejercicioGuardado.imagenLink}`)
        }
      }
      return  plainToInstance(RtaEjercicioBasicoDto, ejercicioModif, { excludeExtraneousValues: true });
      
    } catch (err) {
      throw ErrorManager.handle(err);
    }
  }


}
