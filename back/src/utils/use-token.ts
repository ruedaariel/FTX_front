import { IauthTokenResult, IuseToken } from "src/interfaces/auth.interface";
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IuseToken | string => {
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET!, {
    ignoreExpiration: true }) as unknown; //sino daba error, recibe cualquier cosa

        if (
            typeof decoded === 'object' &&
            decoded !== null &&
            'email' in decoded &&
            'rol' in decoded
        ) {
            const payload = decoded as IauthTokenResult;
            const currentDateMs = new Date().getTime();
            const expiresDateMs = payload.exp*1000; //exp esta en seg y new Date espera miliseg --> convertimos a miliseg
            return {
                sub: payload.sub,
                email: payload.email,
                rol: payload.rol,
                isExpired: expiresDateMs <= currentDateMs 
            }
        } else {
            throw new Error('Token inválido o incompleto');
        }


    } catch (error) {
        return 'Token invalido de usetoken'
    }
}