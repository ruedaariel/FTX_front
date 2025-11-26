import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { LoginRtaDto } from '../dto/login-rta.dto';
import { ESTADO } from '../../constantes/estado.enum';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from '../../config/error.manager';
import { plainToInstance } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { toLocalDateOnly } from 'src/utils/transformar-fecha';
import { DIAS_PROXIMOS } from 'src/constantes/ctes-login';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { PagosService } from 'src/pagos/services/pagos.service';
import { IpayloadToken } from 'src/interfaces/auth.interface';
import { PLAN_MENOR_LEVEL } from 'src/constantes/levels-plan';
import { ResetDto } from '../dto/reset.dto';
import { generateRandomPassword } from 'src/utils/random-password';
import { EmailService } from 'src/shared/email/email.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly pagoService: PagosService,
        private readonly emailService: EmailService) { }
    //@InjectRepository(UsuarioEntity)
    //private readonly usuarioRepository: Repository<UsuarioEntity>,
    /*   @InjectRepository(PagoEntity)
      private readonly pagoRepository: Repository<PagoEntity>) { } */


    public async loginUsuario(body: LoginDto): Promise<LoginRtaDto> { //retorna null si no encuentra el mail para crear unnuevo ususario
        try {

            const unUsuario = await this.usuarioService.findUsuarioByMail(body.email);

            if (!unUsuario) {
                throw new ErrorManager('UNAUTHORIZED', 'Email incorrecto');
            }

            if (unUsuario.estado === ESTADO.ARCHIVADO) {
                throw new ErrorManager('UNAUTHORIZED', 'Tu cuenta está inactiva.\nContactá al administrador para reactivarla.');
            }

            const passwordValida = await bcrypt.compare(body.password, unUsuario.password);
            if (!passwordValida) {
                throw new ErrorManager('UNAUTHORIZED', 'password incorrecta');
            }

            /*    const payload = {
                   sub: unUsuario.id,
                   email: unUsuario.email,
                   rol: unUsuario.rol,
               }; */
            const token = await this.generateJWT(unUsuario);

            let message = "";
            if (unUsuario.rol === "usuario") {

                //ultimo pago del usuario ordenado por fecha (el primero es el mas reciente)
                const ultimosPagos = await this.pagoService.findPagosxId(unUsuario.id);
                console.log("ultimos pagos", ultimosPagos);

                if (!ultimosPagos || ultimosPagos.length === 0) {
                    const fecha = unUsuario.fCreacion instanceof Date ? unUsuario.fCreacion : new Date(unUsuario.fCreacion);
                    const limite = new Date(fecha.getTime());
                    limite.setDate(limite.getDate() + 3); //3 dias para que pague un usuario nuevo
                    console.log(limite.getTime(),"----",Date.now());
                    if (limite.getTime() >= Date.now()) {
                        message = message + " nuevo ";
                        console.log("un nuevo tiene 3 dias para pagar");
                    } else {
                        message = message + " impago ,"
                    }

                } else {
                    const fVencimientoDateOnly = toLocalDateOnly(ultimosPagos[0].fechaVencimiento);
                    const hoyDateOnly = toLocalDateOnly(new Date()); //hoy

                    if (fVencimientoDateOnly.getTime() < hoyDateOnly.getTime()) {
                        message = message + " impago ,"
                    } else {
                        const fProxima = new Date(fVencimientoDateOnly.getTime());
                        fProxima.setDate(fProxima.getDate() - DIAS_PROXIMOS);

                        if (fProxima.getTime() < hoyDateOnly.getTime()) {
                            message = message + " proximo a vencer ,"
                        }
                    }
                }
                if (unUsuario.level === 0) {
                    unUsuario.level = unUsuario.datosPersonales?.plan?.level ? unUsuario.datosPersonales?.plan?.level : PLAN_MENOR_LEVEL; //o el nivel mas basico definido
                    message = message + " primera vez , ";
                }
            }

            const usuarioRtaDto = plainToInstance(LoginRtaDto, {
                ...unUsuario, token, message  // agregás el token y message al DTO
            }, { excludeExtraneousValues: true })

            return usuarioRtaDto;

        } catch (err) {
            console.error('Error al buscar ultimoPago', err.message, err.stack);
            throw ErrorManager.handle(err)
        }
    }

    public async resetPassw(body: ResetDto): Promise<boolean> {
        try {
           
            const unUsuario = await this.usuarioService.findUsuarioByMail(body.email);
            console.log("correo usuario a resetear",unUsuario);
            if (!unUsuario) {
                throw new ErrorManager("BAD_REQUEST", "Correo no válido para una cuenta activa. \n ¿Necesitás cambiarlo? Contactar a tu trainer."
            )  }

            if (unUsuario.estado === ESTADO.ARCHIVADO) {
                throw new ErrorManager("BAD_REQUEST", "Tu cuenta está archivada. \n Contactá a tu personal trainer para reactivar tu acceso.")
            }

            //Generar contraseña y encriptar
            const contrasenaGenerada = generateRandomPassword();
            const contrasenaHasheada = await bcrypt.hash(contrasenaGenerada, +process.env.HASH_SALT);
            const usuarioGuardado = await this.usuarioService.updateUsuario(unUsuario.id, { "datosBasicos": { "password": `${contrasenaGenerada}` } })
            setImmediate(async () => {
                try {
                    await this.emailService.resetPassword(body.email, contrasenaGenerada);
                } catch (error) {
                    throw ErrorManager.handle(error);
                }
            });

            return true
        } catch (error) {
            throw ErrorManager.handle(error);
        }

    }

    private async generateJWT(usuario: UsuarioEntity): Promise<string> {

        const payload: IpayloadToken = {
            sub: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
        };
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET no definido en variables de entorno');

        return jwt.sign(payload, secret, { expiresIn: '2h' });

    }


}


