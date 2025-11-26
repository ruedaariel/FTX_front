import { Expose, Type } from "class-transformer";
import { RtaEjercicioBasicoDto } from "../../ejercicio-basico/dto/rta-ejercicio-basico.dto";

export class RtaEjercicioRutinaDto {
     //CONTROLAR LOS CAMPOS SI SON OBLIGATORIOS O SI HAY ALGO POR DEFECTO
         @Expose()
            idEjercicioRutina: number;
    
        @Expose()
            repeticiones: string;
    
        @Expose()
            dificultad: string;
    
        @Expose()
            peso: number; 
    
        @Expose()
            observaciones: string; //VER SI LO DEFINO COMO { type: 'varchar', length: 255 } o como { type: 'text' }
    
        @Expose()
            ejercicioHecho: boolean = false;
    
        @Expose()
         @Type(()=> RtaEjercicioBasicoDto)
            ejercicioBasico : RtaEjercicioBasicoDto;
    
}