import { Expose } from "class-transformer";
import { ESTADORUTINA } from "../entities/rutina.entity";
import { IsOptional } from "class-validator";

export class RtaAllRutinasDto {
    @Expose()
    idRutina: number;
    
    @Expose()
    nombreRutina: string;

    @Expose()
    estadoRutina: ESTADORUTINA;

    @Expose()
    idUsuario?:number | null;

    @Expose()
    nombreUsuario: string;
   
}