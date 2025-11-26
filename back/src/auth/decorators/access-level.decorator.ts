import { SetMetadata } from "@nestjs/common";
import { ACCESS_LEVEL_KEY } from "src/constantes/key-decorators";

//Metadata recibe key y value ( como value, true o false del guard- accede o no accede a un endpoint)
export const AccessLevel = (level:number) => SetMetadata(ACCESS_LEVEL_KEY,level);