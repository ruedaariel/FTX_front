import { Exclude, Expose, Type } from "class-transformer";
import { DatosPersonalesRtaDto } from "../../usuario-datos-personales/dto/datos-personales-rta.dto";
import { DatosFisicosRtaDto } from "../../usuario-datos-fisicos/dto/datos-fisicos-rta.dto";

import { ESTADO } from "../../constantes/estado.enum";
import { ROL } from "src/constantes/rol";

export class UsuarioDatosCompletosRtaDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    rol: ROL; //ver si se deja

    @Expose()
    estado: ESTADO;

    @Exclude()
    password: string;

    @Exclude()
    level: number;

    @Exclude()
    passwordChangedAt: Date | null;

    @Expose()
    fBaja: Date;

    @Expose()
    fCreacion: Date;

    @Expose()
    fUltimoAcceso: Date;

    @Expose()
    @Type(() => DatosPersonalesRtaDto)
    datosPersonales?: DatosPersonalesRtaDto;

    @Expose()
    @Type(() => DatosFisicosRtaDto)
    datosFisicos?: DatosFisicosRtaDto;

    //no es parte la entity
    @Expose()
    message: string = '';
}
