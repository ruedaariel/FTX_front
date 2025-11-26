import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioBasicoDto } from './create-usuarioBasico.dto';
import { IsEmail, IsEnum, IsInt, IsOptional, Matches } from 'class-validator';
import { ESTADO } from '../../constantes/estado.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUsuarioAdmDto {
    //no se pudo usar el PartialType, porque enel Creat no esta el password
    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail({}, { message: 'El correo no es valido' })
    email?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(ESTADO, { message: 'estado de usuario invalido, debe ser activo,inactivo o archivado (enumerado)' })
    estado?: ESTADO;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt({ message: 'El id del plan debe ser un entero' })
    idPlan?: number;
}
//con el PartialType, ya me lo pone como opcional