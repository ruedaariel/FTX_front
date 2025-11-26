import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosController } from './controllers/pagos.controller';
import { PagoEntity } from './entity/pago.entity';
import { MercadoPagoService } from './services/mercadopago.service';
import { PagosService } from './services/pagos.service';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  //imports: [TypeOrmModule.forFeature([PagoEntity,UsuarioEntity])],
   imports: [TypeOrmModule.forFeature([PagoEntity]), UsuarioModule],
  controllers: [PagosController],
  providers: [PagosService, MercadoPagoService],
  exports: [PagosService],
})
export class PagosModule {}
