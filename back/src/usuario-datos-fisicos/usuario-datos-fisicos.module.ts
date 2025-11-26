import { Module } from '@nestjs/common';
//import { DatosFisicosService } from './services/datos-fisicos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosFisicosEntity } from './entities/datos-fisicos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DatosFisicosEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatosFisicosModule {}
