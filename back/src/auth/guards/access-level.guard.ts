import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ACCESS_LEVEL_KEY, ADMIN_KEY, PUBLIC_KEY, ROL_KEY } from 'src/constantes/key-decorators';
import { ROL } from 'src/constantes/rol';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccessLevelGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>) { }

    async canActivate(
        context: ExecutionContext,
    ) {

        const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler(),); //comprueba si es publica, si es publica, reflector devuelve true, y no hace mas nada

        if (isPublic) {
            return true;
        }

        const roles = this.reflector.get<Array<keyof typeof ROL>>(ROL_KEY, context.getHandler(),);

        const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler(),);

        const accessLevel = this.reflector.get<number>(ACCESS_LEVEL_KEY, context.getHandler(),);

        //Request es de tipo Express (ojo cuando se selecciona, hay que elegir la "llave")
        //saca el objeto Express Request desde el contexto de Nest.
        const req = context.switchToHttp().getRequest<Request>()

        const { rolUser } = req

        if (accessLevel === undefined) {
            if (roles === undefined) {
                if (!admin) {
                    return true
                } else if (admin && rolUser.toUpperCase() === 'ADMIN') {
                    return true
                } else {
                    throw new UnauthorizedException('No tienes permisos para este servicio');
                }
            }
        }


        if (rolUser.toUpperCase() === ROL.ADMIN) {
            return true
        }

        const { idUser } = req;

        //CAMBIAR ESTO Y PONERLO EN EL TOKEN o usar algun metodo para no acceder tanto a la BD 
        const unUsuario = await this.usuarioRepository.findOneBy({ id: +idUser });

        if (!unUsuario) {
            throw new UnauthorizedException('No tienes permisos para este servicio')
        }

        if (accessLevel > unUsuario.level) { //si no funciona, cambiar a !==
            throw new UnauthorizedException('No podés acceder con tu plan actual. \n Actualizá tu PLAN para desbloquear este servicio.')
        }

        return true;
    }
}