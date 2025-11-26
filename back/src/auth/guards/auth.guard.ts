import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from 'src/constantes/key-decorators';
import { IuseToken } from 'src/interfaces/auth.interface';
import { useToken } from 'src/utils/use-token';

@Injectable()
//determina si puedo acceder a una ruta o no
export class AuthGuard implements CanActivate {
  constructor(
  //  private readonly usuarioService: UsuarioService,
    private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY,context.getHandler(),); //comprueba si es publica, si es publica, reflector devuelve true, y no hace mas nada

    if (isPublic) {
      return true;
    }

    //Request es de tipo Express (ojo cuando se selecciona, hay que elegir la "llave")
    //saca el objeto Express Request desde el contexto de Nest.
    const req = context.switchToHttp().getRequest<Request>() 

   //lee la cabecera
    const token = req.headers['ftx_token']
   
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Token invalido')
    }

    //useToken esta en utils y devuelve el payload con el isexpired o un string (error)
    const manageToken: IuseToken | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
     throw new UnauthorizedException('Tu sesion ha expirado. Inicia sesión nuevamente')
    }

    const {sub} = manageToken;
    const { email } = manageToken;
    const { rol } = manageToken;
    req.idUser = String(sub);
    req.rolUser = String(rol);
    req.emailUser = String(email);
    return true;
  }
}
