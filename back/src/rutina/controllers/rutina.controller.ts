import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { RutinaService } from '../services/rutina.service';
import { CreateRutinaDto } from '../dto/create-rutina.dto';
import { UpdateRutinaDto } from '../dto/update-rutina.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Rol } from 'src/auth/decorators/roles.decorator';
import { EstadoDto } from '../dto/estado.dto';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { PLAN_MAYOR_LEVEL } from 'src/constantes/levels-plan';
import { plainToInstance } from 'class-transformer';
import { RtaRutinaDto } from '../dto/rta-rutina.dto';
import { RtaRutinaEstadisticaDto } from '../dto/rta-rutina-estadistica.dto';


@Controller('rutina')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) { }

  @Rol('ADMIN')
  @Post('register')
  public async registerRutina(@Body() createRutinaDto: CreateRutinaDto) {
    return this.rutinaService.createRutina(createRutinaDto);
  }

  @Rol('ADMIN')
  @Get('all')
  public async findAllRutinas() {
    return this.rutinaService.findAllRutinas();
  }
  ///////////////// VER EN DONDE SE LLAMA ////////////////////////
  @Rol('USUARIO')
  @Get(':id')
  public async findRutinaById(@Param('id', ParseIntPipe) id: number) {
    const unaRutina = this.rutinaService.findRutinaById(id);
    const unaRutinaDto = plainToInstance(RtaRutinaDto, unaRutina, { excludeExtraneousValues: true });
    return unaRutinaDto
  }

  @Rol('ADMIN')
  @Get('seguimiento/:id')
  public async findRutinaByIdEstadistica(@Param('id', ParseIntPipe) id: number) {
    const unaRutina = this.rutinaService.findRutinaById(id);
    const unaRutinaDto = plainToInstance(RtaRutinaEstadisticaDto, unaRutina, { excludeExtraneousValues: true });
    return unaRutinaDto
  }
  /// ??????????????????????????????????????????????????
  /*   @Rol('ADMIN')
    @Get('name/:nombre')
    public async findRutinaByName(@Param('nombre') nombre: string) {
      return await this.rutinaService.findRutinaByName(nombre);
    } */

  @Rol('ADMIN')
  @Put('update/:id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() rutinaDto: CreateRutinaDto) {
    //uso CreateRutinaDto para obligar a que traiga todos los campos como si estuviera creando una nueva rutina
    return this.rutinaService.updateRutina(id, rutinaDto);
  }

  @Rol('ADMIN')
  @Delete('delete/:id')
  public async deleteRutina(@Param('id', ParseIntPipe) id: number) {
    return this.rutinaService.deleteRutina(id);
  }

  @Rol('USUARIO')
  @Put('updateEstado/:id')
  public async updateEstado(@Param('id', ParseIntPipe) id: number, @Body() body: EstadoDto) {
    return this.rutinaService.updateEstado(id, body);
  }
}
