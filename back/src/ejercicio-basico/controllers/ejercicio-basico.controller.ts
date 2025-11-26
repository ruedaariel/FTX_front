import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EjercicioBasicoService } from '../services/ejercicio-basico.service';
import { CreateEjercicioBasicoDto } from '../dto/create-ejercicio-basico.dto';
import { UpdateEjercicioBasicoDto } from '../dto/update-ejercicio-basico.dto';
import { imagenEjercicioInterceptor } from '../../interceptors/imagen-ejercicio.interceptor';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Rol } from 'src/auth/decorators/roles.decorator';



@Controller('ejbasico')
@UseGuards(AuthGuard, RolesGuard)
export class EjercicioBasicoController {
  constructor(private readonly ejercicioBasicoService: EjercicioBasicoService) { }

  @Rol('ADMIN')
  @Post('register')
  @UseInterceptors(imagenEjercicioInterceptor()) //ver src/interceptors/imagen-interceptor
  async createEjercicioBasico(
    @UploadedFile() file: Express.Multer.File, // Aquí llega la imagen
    @Body() body: CreateEjercicioBasicoDto // Aquí llegan los datos del ejercicio (nombre, descripción, etc.)
  ) {
    body.imagenLink = file?.filename || null;
    return this.ejercicioBasicoService.createEjercicioBasico(body);
  }

  @Rol('ADMIN')
  @Get('all')
  findAll() {
    return this.ejercicioBasicoService.findAll();
  }

  /*   @Rol('ADMIN')
      @Get('allnames')
    findAllNames() {
      return this.ejercicioBasicoService.findAllNames();
    } */

  /*  @Rol('ADMIN')
   @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number) {
     return this.ejercicioBasicoService.findOne(+id);
   } */

  @Rol('ADMIN')
  @Patch('update/:id')
  @UseInterceptors(imagenEjercicioInterceptor()) //ver src/interceptors/imagen-interceptor
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEjercicioBasicoDto: UpdateEjercicioBasicoDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file?.filename) {
      updateEjercicioBasicoDto.imagenLink = file?.filename;
    }
    return this.ejercicioBasicoService.update(id, updateEjercicioBasicoDto);
  }

  @Rol('ADMIN')
  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ejercicioBasicoService.remove(id);
  }

  /*  @Rol('ADMIN')
   @Get('name/:name')
   findByName(@Param('name') nombreEj: string) {
     return this.ejercicioBasicoService.findByName(nombreEj);
   } */

  /*  @Rol('ADMIN')
   @Get('existName/:name')
   existName(@Param('name') nombreEj: string) {
     return this.ejercicioBasicoService.existName(nombreEj);
   }
  */

}
