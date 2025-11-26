import { Expose, Transform } from "class-transformer";
import { formatToDdMmYy } from "src/utils/transformar-fecha";
import { METODODEPAGO } from "../entity/pago.entity";
import { ESTADO } from "src/constantes/estado.enum";

export class RtaImpagosDto {
  @Expose({ name: 'pagoId' })
  idPagos: number;

  @Expose()
  @Transform(({ value }) => value ? formatToDdMmYy(value) : null)
  fechaPago: Date | null;

  @Expose()
  @Transform(({ value }) => value ? formatToDdMmYy(value) : null)
  fechaVencimiento: Date | null;

  @Expose()
  metodoDePago: METODODEPAGO | null;

  @Expose()
  monto: number | null;

  @Expose()
  usuarioId: number;

  @Expose()
  estadoUsuario?: ESTADO;

  @Expose()
  nombre?: string;

  @Expose()
  apellido?: string;

  // otros campos que quieras exponer, con los mismos aliases que tus queries
}