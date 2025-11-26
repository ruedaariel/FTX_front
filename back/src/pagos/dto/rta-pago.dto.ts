import { Exclude, Expose, Transform, Type } from "class-transformer";
import { METODODEPAGO } from "../entity/pago.entity";
import { formatToDdMmYy } from "src/utils/transformar-fecha";
import { UsuarioRtaDto } from "src/usuario/dto/usuario-rta.dto";
import { ESTADO } from "src/constantes/estado.enum";

export class RtaPagoDto {
    @Expose()
    idPagos: number;

    @Expose()
    @Transform(({ value }) => formatToDdMmYy(value))
    fechaPago: Date | null;

    @Expose()
    @Transform(({ value }) => formatToDdMmYy(value))
    fechaVencimiento: Date | null;

    @Exclude()
    estado: string; // status devuelto por MercadoPago

    @Exclude()
    diasAdicionales: number;

    @Expose()
    metodoDePago: METODODEPAGO;

    @Expose()
    monto: number;

    @Expose()
    usuarioId: number;

    @Exclude()
    createdAt: Date;

    //como se usa en 2 metodos, en uno vienen estyos 3 datos y en el otro, no, por eso pregunta 
    //por value (si viene algo) y luego analiza el objeto
    @Expose()
    @Transform(({ value, obj }) => value ?? obj.usuario?.estado ?? undefined, { toClassOnly: true })
    estadoUsuario?: ESTADO;

    @Expose()
    @Transform(({ value, obj }) => value ?? obj.usuario?.datosPersonales?.nombre ?? undefined, { toClassOnly: true })
    nombre?: string;

    @Expose()
    @Transform(({ value, obj }) => value ?? obj.usuario?.datosPersonales?.apellido ?? undefined, { toClassOnly: true })
    apellido?: string;
}