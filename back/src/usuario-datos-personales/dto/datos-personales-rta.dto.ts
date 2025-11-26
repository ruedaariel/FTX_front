import { format } from "date-fns";
import { GENERO } from "../entities/datos-personales.entity";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { ESTADO } from "../../constantes/estado.enum";
import { PlanRtaDto } from "../../plan/dto/plan-rta.dto";
import { transforma_a_DDMMYY } from "src/utils/transformar-fecha";


export class DatosPersonalesRtaDto {
  @Exclude()
  id: number;
  @Expose()
  nombre: string;
  @Expose()
  apellido: string;
  @Expose()
  dni: string;
  @Expose()
  phone: string;
  @Expose()
  genero: GENERO;
  @Expose()
  @Type(() => PlanRtaDto)
  plan: PlanRtaDto;
  @Expose()
/*   @Transform(({ value }) =>
     {
    console.log("Valor en transform fecha", value);
    if (value == null) return null;               // null | undefined
    if (typeof value === 'string') {
      if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(value)) {
        const [yyyy, mm, dd] = value.split('-');
        return `${dd}/${mm}/${yyyy}`; 
      } else {
        return value;
      
      }


    }
    if (value instanceof Date && !isNaN(value.getTime())) {

      return format(value, 'dd-MM-yyyy');
    }
    if (typeof value === 'number') {               // timestamp
      const d = new Date(value);
      if (!isNaN(d.getTime())) return format(d, 'dd/MM/yyyy');
    }
    return null;
  }) //transforma a string con formato y tambien acepta null */
   @Transform(({ value } ) => transforma_a_DDMMYY(value))
  fNacimiento: string;
  
  @Expose()
  @Transform(({ value }) => {
    const port = process.env.PORT || '8000';
    const host = process.env.HOST || 'localhost';
    const baseUrl = `http://${host}:${port}/uploads/perfiles/`;
    if (!value) return "";
    if (value.startsWith(baseUrl)) return value;
    return baseUrl + value;
  })
  imagenPerfil: string;
  @Exclude()
  estado: ESTADO;
}

