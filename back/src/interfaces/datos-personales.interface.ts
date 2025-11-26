import { GENERO } from "src/usuario-datos-personales/entities/datos-personales.entity";



export interface IDatosPersonales {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  phone: string;
  genero: GENERO;
}
