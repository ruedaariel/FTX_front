import { SetMetadata } from "@nestjs/common";
import { PUBLIC_KEY } from "src/constantes/key-decorators";

//Metadata recibe key y value ( como value, true o false del guard- accede o no accede a un endpoint)
export const PublicAccess = () => SetMetadata(PUBLIC_KEY,true)