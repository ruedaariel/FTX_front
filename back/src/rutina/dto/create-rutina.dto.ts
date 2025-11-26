import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, Matches, Min, ValidateNested } from "class-validator";
import { ESTADORUTINA } from "../entities/rutina.entity";
import { Type } from "class-transformer";
import { CreateSemanaDto } from "../../semana/dto/create-semana.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateRutinaDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Matches(/^.{3,}$/, { message: 'El nombre debe tener al menos 2 caracteres' })
    nombreRutina: string;

    @ApiProperty()
    @IsEnum(ESTADORUTINA, { message: "Debe tener algun estado valido" })
    estadoRutina: ESTADORUTINA;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt({ message: 'El idUsuario debe ser un número entero' })
    @Min(0, { message: 'el id debe ser un numero positivo' })
    idUsuario?: number | null;

    @ApiPropertyOptional()
    @IsOptional()
    @ValidateNested({ each: true }) //aplica la validacion a cada elemento del arreglo
    @IsArray()
    @Type(() => CreateSemanaDto)
    semanas?: CreateSemanaDto[];
}
