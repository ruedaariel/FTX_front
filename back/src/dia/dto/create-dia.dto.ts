// export class CreateDiaDto {}
// En la carpeta src/dia/dto/create-dia.dto.ts

import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Length,
  Matches,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { CreateEjercicioRutinaDto } from '../../ejercicio-rutina/dto/create-ejercicio-rutina.dto';

export class CreateDiaDto {
  @IsString({ message: 'El número de día debe ser un texto.' })
  @IsNotEmpty({ message: 'El número de día no puede estar vacío.' })
  @Length(1, 1, { message: 'El número de día debe tener 1 caracter.' })
  @Matches(/^[1-7]$/, { message: 'Debe ser un número entre 1 y 7' })
  nroDia: string;

  @IsString({ message: 'El focus debe ser un texto.' })
  @IsNotEmpty({ message: 'El focus no puede estar vacío.' })
  focus: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateEjercicioRutinaDto)
  ejerciciosRutina?: CreateEjercicioRutinaDto[];
}