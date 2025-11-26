import {  IsEnum } from "class-validator";
import { ESTADORUTINA } from "../entities/rutina.entity";
import { ApiProperty } from "@nestjs/swagger";

export class EstadoDto {
    @ApiProperty()
    @IsEnum(ESTADORUTINA, { message: "Debe tener algun estado valido" })
    estadoRutina: ESTADORUTINA;
}
