import { Module } from '@nestjs/common';
import { SemanaService } from './semana.service';

@Module({
  controllers: [],
  providers: [SemanaService],
})
export class SemanaModule {}
