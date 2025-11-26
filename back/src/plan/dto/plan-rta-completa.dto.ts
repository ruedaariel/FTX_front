import { Exclude, Expose } from "class-transformer";

export class PlanRtaCompletaDto {
  @Expose()
  idPlan: number;

  @Expose()
  nombrePlan: string;

  // Otros campos que quieras exponer, como el precio
  // @Exclude()
  @Expose()
  precio: number;

  @Expose()
  descripcion: string;

  @Expose()
  beneficios: string;

  @Exclude()
  noIncluye: string;

  @Exclude()
  level: number; 

  @Exclude()
  fCambio: Date;
}