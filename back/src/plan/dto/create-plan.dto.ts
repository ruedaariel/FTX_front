import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsNumber, Min, IsDateString, IsOptional } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty()
  @IsNotEmpty({ message: "El nombre del plan no debe ser vacio" })
  @IsString({ message: "El nombre del plan debe ser una cadena de letras" })
  @MaxLength(30, { message: "El nombre del plan debe tener 30 caracteres como máximo" })
  nombrePlan: string;

  @ApiProperty()
  @IsNotEmpty({ message: "La descripción del plan no debe ser vacio" })
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Llos beneficios del plan no debe ser vacio' })
  @IsString({ message: 'Los beneficios del Plan debe ser un string' })
  @MaxLength(255, { message: 'El campo beneficios no puede superar los 255 caracteres' })
  beneficios: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Los beneficios del Plan debe ser un string' })
  @MaxLength(255, { message: 'El campo beneficios no puede superar los 255 caracteres' })
  noIncluye: string;

  @ApiProperty()
  @IsNotEmpty({ message: "El precio del plan no debe ser vacio" })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: "El precio del plan debe ser un numero (0 como mínimo)" })
  @Min(0, { message: "El precio del plan debe ser 0 como mínimo" })
  precio: number;
}

