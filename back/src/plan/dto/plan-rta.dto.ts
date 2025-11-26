import { Exclude, Expose } from "class-transformer";

export class PlanRtaDto {
  @Expose()
  idPlan: number;

  @Expose()
  nombrePlan: string;

  // Otros campos que quieras exponer, como el precio
  // @Exclude()
  @Expose()
  precio: number;

  // El resto de los campos de la entidad PlanEntity se excluirán por defecto
  // (a menos que se usen en otro DTO)
  @Exclude()
  descripcion: string;

  @Exclude()
  beneficios: string;

  @Exclude()
  noIncluye: string;

  @Exclude()
  level: number;

  @Exclude()
  fCambio: Date;
}