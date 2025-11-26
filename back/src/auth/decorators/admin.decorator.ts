import { SetMetadata } from "@nestjs/common";
import { ADMIN_KEY } from "src/constantes/key-decorators";
import { ROL } from "src/constantes/rol";

//Metadata recibe key y value ( como value, true o false del guard- accede o no accede a un endpoint)
export const AdminAccess = () => SetMetadata(ADMIN_KEY,ROL.ADMIN)