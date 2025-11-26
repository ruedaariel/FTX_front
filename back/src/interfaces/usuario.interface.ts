import { ESTADO } from "src/constantes/estado.enum";
import { ROL } from "src/constantes/rol";


export interface IUsuario {
    id: number;
    email: string;
    rol: ROL;
    fCreacion: Date;
    fUltimoAcceso: Date;
    fBaja: Date|null,
    estado: ESTADO
}