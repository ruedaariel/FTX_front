import { Module } from '@nestjs/common';
import { DiaService } from './dia.service';

@Module({
  controllers: [],
  providers: [DiaService],
})
export class DiaModule {}
