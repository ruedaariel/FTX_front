import { ESTADOSEMANA } from "src/semana/entities/semana.entity";


export interface ISemana {
    idSemana:number;
    nroSemana: string;
    estadoSemana: ESTADOSEMANA;

}