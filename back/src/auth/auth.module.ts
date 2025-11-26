import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { PagoEntity } from 'src/pagos/entity/pago.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PagosModule } from 'src/pagos/pagos.module';
import { EmailModule } from 'src/shared/email/email.module';

//se usa en todos lados, para no declararlo, lo defino global, ojo no hay que abusar
@Global()
@Module({
    //imports: [TypeOrmModule.forFeature([UsuarioEntity,PagoEntity]),],
    imports: [PagosModule, UsuarioModule,EmailModule],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
