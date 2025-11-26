import { Module } from '@nestjs/common';
import { PlanController } from './controllers/plan.controller';
import { PlanService } from './services/plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './entities/plan.entity';
import { DatosPersonalesEntity } from '../usuario-datos-personales/entities/datos-personales.entity';
import { HistoricoPlanEntity } from './entities/historico-plan.entity';


@Module({
   imports: [TypeOrmModule.forFeature([PlanEntity,DatosPersonalesEntity,HistoricoPlanEntity])],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
