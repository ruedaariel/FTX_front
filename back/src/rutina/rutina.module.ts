import { Module } from '@nestjs/common';
import { RutinaController } from './controllers/rutina.controller';
import { RutinaService } from './services/rutina.service';
import { RutinaEntity } from './entities/rutina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { EjercicioBasicoEntity } from '../ejercicio-basico/entities/ejercicio-basico.entity';
import { FileImgModule } from '../shared/file-img/file-img.module';


@Module({
  imports: [TypeOrmModule.forFeature([RutinaEntity,UsuarioEntity,EjercicioBasicoEntity]), UsuarioModule,FileImgModule],
  controllers: [RutinaController],
  providers: [RutinaService],
})
export class RutinaModule {}
