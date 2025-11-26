import { ROL } from "../constantes/rol";

export interface IpayloadToken {
    sub: number;
    email: string;
    rol : ROL;
}

export interface IauthTokenResult {
    sub:   number;
    email: string;
    rol:   string;
    iat:   number;
    exp:   number;
}

export interface IuseToken {
    sub:   number;
    email: string;
    rol:   string;
    isExpired:boolean;
}