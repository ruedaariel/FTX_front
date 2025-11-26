import { Expose, Transform } from "class-transformer";

export class RtaEjercicioBasicoDto {

    @Expose()
    idEjercicioBasico: number;

    @Expose()
    nombreEjercicio: string;

    @Expose()
    observaciones: string;

    @Expose()
    @Transform(({ value }) => {
        const port = process.env.PORT || '8000';
        const host = process.env.HOST || 'localhost';
        const baseUrl = `http://${host}:${port}/uploads/ejercicios/`;
        if (!value) return "";
        if (value.startsWith(baseUrl)) return value;
        return baseUrl + value;
    })
    imagenLink: string;

    @Expose()
    videoLink: string;
}