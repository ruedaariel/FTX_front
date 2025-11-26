import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROL_KEY } from 'src/constantes/key-decorators';
import { ROL } from 'src/constantes/rol';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler(),); //comprueba si es publica, si es publica, reflector devuelve true, y no hace mas nada

        if (isPublic) {
            return true;
        }

        const roles = this.reflector.get<Array<keyof typeof ROL>>(ROL_KEY, context.getHandler(),);

        const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler(),);


        //Request es de tipo Express (ojo cuando se selecciona, hay que elegir la "llave")
        //saca el objeto Express Request desde el contexto de Nest.
        const req = context.switchToHttp().getRequest<Request>()

        const { rolUser } = req

        if (roles === undefined) {
            if (!admin) {
                return true
            } else if (admin && rolUser.toUpperCase() === 'ADMIN') {
                return true
            } else {
                throw new UnauthorizedException('No tienes permisos para acceder a este servicio')
            }
        }

    
      
        if (rolUser.toUpperCase() === ROL.ADMIN || rolUser === ROL.ADMIN) {
            return true
        }

        const isAuth = roles.some(rol => rol === rolUser.toUpperCase() || rol === rolUser);

        if (!isAuth) {
            throw new UnauthorizedException('No tienes permisos para acceder a esta operación')
        }
        return true;
    }
}
