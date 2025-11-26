import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, Min } from "class-validator";

export class CreateDatosFisicosDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'La actividad diaria no puede estar vacía' })
  @IsString({ message: 'La actividad diaria debe ser un texto' })
  actividadDiaria: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El peso no puede estar vacío' })
  @IsNumber({}, { message: 'El peso debe ser un número' })
  @Min(30, { message: 'El peso debe ser al menos 30kg' })
  @Max(150, { message: 'El peso debe ser como máximo 150kg' })
  peso: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'La estatura no puede estar vacía' })
  @IsNumber({}, { message: 'La estatura debe ser un número' })
  @Min(50, { message: 'La estatura debe ser al menos 50cm' })
  @Max(250, { message: 'La estatura debe ser como máximo 250cm' })
  estatura: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Las metas no pueden estar vacías' })
  @IsString({ message: 'Las metas deben ser un texto' })
  metas: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser texto si se incluyen' })
  observaciones?: string;
}
