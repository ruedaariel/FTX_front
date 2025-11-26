import { Module } from '@nestjs/common';
import { EjercicioRutinaService } from './services/ejercicio-rutina.service';
import { EjercicioRutinaController } from './controllers/ejercicio-rutina.controller';
import { EjercicioRutinaEntity } from './entities/ejercicio-rutina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EjercicioRutinaEntity]),],
  controllers: [EjercicioRutinaController],
  providers: [EjercicioRutinaService],
})
export class EjercicioRutinaModule {}
