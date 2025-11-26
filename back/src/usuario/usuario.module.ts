import { Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { DatosPersonalesEntity } from '../usuario-datos-personales/entities/datos-personales.entity';
import { DatosFisicosEntity } from '../usuario-datos-fisicos/entities/datos-fisicos.entity';
import { DatosFisicosModule } from '../usuario-datos-fisicos/usuario-datos-fisicos.module';
import { DatosPersonalesModule } from '../usuario-datos-personales/datos-personales.module';
import { PlanEntity } from '../plan/entities/plan.entity';
import { PlanModule } from '../plan/plan.module';
import { RutinaEntity } from '../rutina/entities/rutina.entity';
import { EmailModule } from '../shared/email/email.module';
import { FileImgModule } from '../shared/file-img/file-img.module';



@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, DatosPersonalesEntity, DatosFisicosEntity, PlanEntity, RutinaEntity]), DatosFisicosModule,DatosPersonalesModule, PlanModule, EmailModule, FileImgModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports : [UsuarioService, TypeOrmModule]
 
})
export class UsuarioModule {}
