// export class CreateEjercicioRutinaDto {}

// En la carpeta src/ejercicio-rutina/dto/create-ejercicio-rutina.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  IsPositive,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';

export class CreateEjercicioRutinaDto {
  @IsString({ message: 'Las repeticiones deben ser un texto (ej: "4x12").' })
  @IsNotEmpty({ message: 'Las repeticiones no pueden estar vacías.' })
  @MaxLength(30, { message: 'Las repeticiones no deben exceder los 30 caracteres.' })
  repeticiones: string;

  @IsString({ message: 'La dificultad debe ser un texto.' })
  @IsNotEmpty({ message: 'La dificultad no puede estar vacía.' })
  @MaxLength(30, { message: 'La dificultad no debe exceder los 30 caracteres.' })
  dificultad: string;

  @IsNumber({}, { message: 'El peso debe ser un número.' })
  @IsNotEmpty({ message: 'El peso no puede estar vacío.' })
  @Min(0, { message: 'El peso debe ser un numero positivo o 0kg' })
  @Max(500, { message: 'El peso debe ser como máximo 500kg' })
  peso: number;

  @IsString()
  @IsOptional() // Se marca como opcional porque en la entidad es nullable
  observaciones?: string;

  @IsBoolean()
  @IsOptional()
  ejercicioHecho?:boolean;

  @IsNumber()
  @IsNotEmpty({ message: 'El ID del ejercicio básico no puede estar vacío.' })
  idEjercicioBasico: number;

}
