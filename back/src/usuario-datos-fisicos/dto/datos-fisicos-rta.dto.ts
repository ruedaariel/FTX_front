import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, Min } from "class-validator";
import { ESTADO } from "../../constantes/estado.enum";

export class DatosFisicosRtaDto {
  @Exclude()
  id:number;
  @Expose()
  actividadDiaria: string;
  @Expose()
  peso: number;
  @Expose()
  estatura: number;
  @Expose()
  metas: string;
  @Expose()
  observaciones: string;
  @Exclude()
  estado: ESTADO;

}
