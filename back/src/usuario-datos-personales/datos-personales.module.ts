import { Module } from '@nestjs/common';
//
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosPersonalesEntity } from './entities/datos-personales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DatosPersonalesEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatosPersonalesModule {}
