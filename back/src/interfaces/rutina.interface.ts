import { ESTADORUTINA } from "src/rutina/entities/rutina.entity";


export interface IRutina {
    idRutina: number;
    nombreRutina: string;
    estadoRutina: ESTADORUTINA;
    fCreacionRutina: Date;
    fUltimoAccesoRutina: Date;
    fBajaRutina: Date|null, //VER
   
}