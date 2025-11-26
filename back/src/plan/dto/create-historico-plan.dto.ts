import { IsNotEmpty, IsString, MaxLength, IsNumber, Min, IsDateString, IsInt, IsDate } from 'class-validator';

export class CreateHistoricoPlanDto {
  @IsInt()
  @Min(1, { message: 'El id del plan debe ser mayor a 0' })
  idPlanOrigen: number;

  @IsNotEmpty({ message: 'El nombre del plan no debe estar vacio' })
  @IsString()
  @MaxLength(30, { message: 'El nombre del Plan no debe ser mayor a 30' })
  nombrePlan: string;

  @IsNotEmpty({ message: 'La descripcion del cambio del plan no debe estar vacio' })
  @IsString({ message: 'la descripcion del Plan debe ser un string' })
  descripcion: string;

  @IsNotEmpty({ message: 'Llos beneficios del plan no debe ser vacio' })
  @IsString({ message: 'Los beneficios del Plan debe ser un string' })
  @MaxLength(255, { message: 'El campo beneficios no puede superar los 255 caracteres' })
  beneficios: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0, { message: 'El precio del plan debe ser mayor o igual a 0' })
  precio: number;

  @IsNotEmpty({ message: 'Debe contener la fecha de inicio del plan' })
  @IsDate()
  fCambioInicio: string;

  @IsNotEmpty({ message: 'El detalle del cambio del plan no debe estar vacio' })
  @IsString({ message: 'El detalle del cambio del plan debe ser string' })
  detalleCambio: string;
}

