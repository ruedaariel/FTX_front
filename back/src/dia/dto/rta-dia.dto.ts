import { Expose, Type } from "class-transformer";
import { RtaEjercicioRutinaDto } from "../../ejercicio-rutina/dto/rta-ejercicio-rutina.dto";

export class RtaDiaDto {
       @Expose()
        idDia: number;
    
        @Expose()
        nroDia: string; 
    
        @Expose()
        focus: string; //VER SI LO DEJAMOS - podemos hacer una tabla de frases y su imagen
        //VER SI AGREGAMOS IMAGEN SEGUN FRONT
    
       @Expose()
       @Type(()=> RtaEjercicioRutinaDto)
        ejerciciosRutina: RtaEjercicioRutinaDto[];
}