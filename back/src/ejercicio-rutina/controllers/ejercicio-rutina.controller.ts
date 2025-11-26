import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EjercicioRutinaService } from '../services/ejercicio-rutina.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Rol } from 'src/auth/decorators/roles.decorator';



@Controller('ejrutina')
@UseGuards(AuthGuard, RolesGuard)
export class EjercicioRutinaController {
  constructor(private readonly ejercicioRutinaService: EjercicioRutinaService) { }

  @Rol('USUARIO')
  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: { ejercicioHecho: boolean }) {
    return this.ejercicioRutinaService.updateEjHecho(id, body.ejercicioHecho);
  }


}
