import { Body, Controller, Post, Get, Delete, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PagosService } from '../services/pagos.service';
import { CreatePagoDto, IniciarPagoDto } from '../dto/create-pago.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { plainToInstance } from 'class-transformer';
import { RtaPagoDto } from '../dto/rta-pago.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Rol } from 'src/auth/decorators/roles.decorator';

@Controller('pagos')
@UseGuards(AuthGuard,RolesGuard)
export class PagosController {
  constructor(private readonly pagosService: PagosService) { }

 /*  @Post('iniciar')
  async iniciarPago(@Body() iniciarPagoDto: IniciarPagoDto) {
    // Recibe los datos del frontend y llama al servicio para procesar el pago
    return await this.pagosService.iniciarPago(iniciarPagoDto);
  } */

    @Rol('ADMIN')
  @Post('/manual')
  async registrarPagoManual(@Body() createPagoDto: CreatePagoDto) {
    // Registra un pago manual (transferencia/efectivo) directamente
    const pagoGuardado =
      await this.pagosService.guardarPagoManual(createPagoDto);
    return {
      message: 'Pago manual registrado exitosamente',
      //pago: pagoGuardado,
      pago: true,
    };
  }

  //obtener todos los pagos
  @Rol('ADMIN')
  @Get()
  async obtenerTodosLosPagos() {
    return await this.pagosService.obtenerTodosLosPagos();
  }

  @Rol('ADMIN')
    @Get('/impagos')
  async obtenerImpagos() {
    return await this.pagosService.obtenerImpagos();
  }

  @Rol('USUARIO')
  //obtener pagos por id
  @Get(':id')
  async obtenerPagoPorId(@Param('id', ParseIntPipe) id: number) {
    const pagos = await this.pagosService.findPagosxId(id);
    const pagosDto = plainToInstance(RtaPagoDto, pagos, { excludeExtraneousValues: true }) ;
    return pagosDto
  }

  //eliminar pago por id
 /*  @Delete(':id')
  async eliminarPago(@Param('id') id: number) {
    await this.pagosService.eliminarPago(+id);
    return { message: 'Pago eliminado exitosamente' };
  } */

 /*  @Post('webhook')
  async recibirWebhook(@Body() webhookData: any) {
    // Recibe notificaciones de MercadoPago sobre cambios de estado
    return await this.pagosService.actualizarEstadoPago(webhookData);
  } */
}
