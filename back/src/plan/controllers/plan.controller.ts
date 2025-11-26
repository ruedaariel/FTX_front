import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PlanService } from '../services/plan.service';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { plainToInstance } from 'class-transformer';
import { PlanRtaCompletaDto } from '../dto/plan-rta-completa.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Rol } from 'src/auth/decorators/roles.decorator';
import { PublicAccess } from 'src/auth/decorators/public.decorator';


@Controller('plan')
@UseGuards(AuthGuard, RolesGuard)
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Rol('ADMIN')
  @Post('register')
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @PublicAccess()
  @Get('all')
  findAll() {
    return this.planService.findAll();
  }

  @Rol('ADMIN')
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return plainToInstance(PlanRtaCompletaDto,this.planService.findOneById(id));
  }

  @Rol('ADMIN')
  @Patch('update/:id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(id, updatePlanDto);
  }

  @Rol('ADMIN')
  @Delete('delete/:id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.planService.remove(id);
  }
}
