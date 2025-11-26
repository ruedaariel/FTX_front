import { Exclude, Expose, Transform } from "class-transformer";

export class RtaNombreEjercicioBasicoDto {

      @Expose()
      idEjercicioBasico: number; 

    @Expose()
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' ')) //le quita espacios en blanco de mas
    nombreEjercicio: string;

    @Exclude()
    observaciones:string;

    @Exclude()
    imagenLink: string | null;

    @Exclude()
    videoLink: string | null;
}
