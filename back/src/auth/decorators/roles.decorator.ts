import { SetMetadata } from "@nestjs/common";
import {  ROL_KEY } from "src/constantes/key-decorators";
import { ROL } from "src/constantes/rol";

//Metadata recibe key y value ( como value, true o false del guard- accede o no accede a un endpoint)
export const Rol = (...roles: Array<keyof typeof ROL>) => SetMetadata(ROL_KEY,roles);