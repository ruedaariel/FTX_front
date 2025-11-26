import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Min } from "class-validator";
import { GENERO } from "../entities/datos-personales.entity";
import { Transform } from "class-transformer";
import { parseISO } from "date-fns";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class CreateDatosPersonalesDto {
@ApiProperty()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Matches(/^.{2,}$/, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @Matches(/^.{2,}$/, { message: 'El apellido debe tener al menos 2 caracteres' })
  apellido: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
  @Matches(/^\d{7,8}$/, { message: 'El DNI debe tener 7 u 8 dígitos numéricos' })
  dni: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  @Matches(/^\d{10}$/, { message: 'El teléfono debe tener exactamente 10 dígitos' })
  phone: string;

  @ApiProperty()
  @IsEnum(GENERO, { message: 'El género debe ser "hombre", "mujer" o "otro"' })
  genero: GENERO;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'El id del plan debe ser mayor a 0' })
  idPlan: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'La fecha de nacimiento no debe ser vacia' })
  @IsDateString()
  fNacimiento: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imagenPerfil?: string;  //CUando se crea no se carga la imagen de perfil
}

