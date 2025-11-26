import { Expose, Type } from "class-transformer";
import { ESTADOSEMANA } from "../entities/semana.entity";
import { RtaDiaDto } from "../../dia/dto/rta-dia.dto";

export class RtaSemanaDto {
    @Expose()
    idSemana: number;

    @Expose()
    nroSemana: string;

    @Expose()
    estadoSemana: ESTADOSEMANA;

    @Expose()
    @Type(() => RtaDiaDto)
    dias?: RtaDiaDto[];
}