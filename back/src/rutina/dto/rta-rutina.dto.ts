import { PartialType } from '@nestjs/mapped-types';
import { CreateRutinaDto } from './create-rutina.dto';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ESTADORUTINA } from '../entities/rutina.entity';
import { RtaSemanaDto } from '../../semana/dto/rta-semana.dto';

export class RtaRutinaDto {
        @Expose()
        idRutina: number;

        @Expose()
        nombreRutina: string;

        @Expose()
        estadoRutina: ESTADORUTINA;

        @Exclude()
        fCreacionRutina: Date;

        @Exclude()
        fUltimoAccesoRutina: Date;

        @Exclude() //para borrado logico
        fBajaRutina: Date | null; //VER SI LO HACEMOS LOGICO

        @Expose()
        @Transform(({ obj, value }) => {
                // 1) Si el value ya es un número (transformación previa), retornarlo tal cual
                if (typeof value === 'number') return value;

                // 2) Si el objeto trae usuario, devolver su id
                const usuarioIdFromObj = obj?.usuario?.id;
                if (typeof usuarioIdFromObj === 'number') return usuarioIdFromObj;

                // 3) Si existe idUsuario en el objeto plano (el dto se usa en distintos metodos), usarlo
                if (typeof obj?.idUsuario === 'number') return obj.idUsuario;

                // 4) Fallback seguro
                return null;
        })


        idUsuario: number | null;

        @Expose()
        @Type(() => RtaSemanaDto)
        semanas?: RtaSemanaDto[];
}
