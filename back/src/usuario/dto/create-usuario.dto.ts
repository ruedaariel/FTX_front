import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { CreateUsuarioBasicoDto } from "./create-usuarioBasico.dto";
import { CreateDatosPersonalesDto } from "../../usuario-datos-personales/dto/create-datos-personales.dto";
import { CreateDatosFisicosDto } from "../../usuario-datos-fisicos/dto/create-datos-fisicos.dto";
import { UpdateDatosPersonalesDto } from "src/usuario-datos-personales/dto/update-datos-personales.dto";
import { UpdateDatosFisicosDto } from "src/usuario-datos-fisicos/dto/update-datos-fisicos.dto";
import { ApiProperty } from "@nestjs/swagger";



export class CreateUsuarioDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateUsuarioBasicoDto)
  datosBasicos: CreateUsuarioBasicoDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateDatosPersonalesDto)
  datosPersonales: CreateDatosPersonalesDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateDatosFisicosDto)
  datosFisicos: CreateDatosFisicosDto;
}

//Para crear un admin
/* export class CreateUsuarioDto {

  @ValidateNested()
  @Type(() => CreateUsuarioBasicoDto)
  datosBasicos: CreateUsuarioBasicoDto;

    @IsOptional()
  @ValidateNested()
  @Type(() => UpdateDatosPersonalesDto)
  datosPersonales?: UpdateDatosPersonalesDto;

    @IsOptional()
  @ValidateNested()
  @Type(() => UpdateDatosFisicosDto)
  datosFisicos?: UpdateDatosFisicosDto;
}
 */