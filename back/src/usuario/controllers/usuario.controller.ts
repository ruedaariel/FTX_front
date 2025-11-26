import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
//import { LoginDto } from '../dto/login.dto';
import { imagenPerfilInterceptor } from '../../interceptors/imagen-perfil.interceptor';
import { ErrorManager } from '../../config/error.manager';
import { UpdateUsuarioAdmDto } from '../dto/update-Usuario-adm.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Rol } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
//import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
//import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
//import { RtaPagoDto } from 'src/pagos/dto/rta-pago.dto';
import { plainToInstance } from 'class-transformer';
import { UsuarioRtaDto } from '../dto/usuario-rta.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

//@AccessLevel(30)
//@ApiTags('usuario')
@Controller('usuario')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService
  ) { }

  @PublicAccess()
  @Post('register')
  public async registerUsuario(@Body() body: CreateUsuarioDto) {
    return await this.usuarioService.createUsuario(body);
  }

  @Rol('ADMIN')
  @Get('all')
  public async findAllUsuarios() {
    return await this.usuarioService.findAllUsuarios();
  }

  @Rol('USUARIO')
  @Get(':id') //si en @Param no uso 'id', la variable id:number lo toma como objeto y se debe desestructurar en el curpo del controller
  public async findUsuarioById(@Param('id', ParseIntPipe) id: number) { //controla si llega un entero y lanza el error

    const unUsuario = await this.usuarioService.findUsuarioById(id);
    const usuarioRtaDto = plainToInstance(UsuarioRtaDto, unUsuario);
    return usuarioRtaDto
  }

  //se usa en usuario/rutinas y usuario/estadisticas
  @Rol('USUARIO')
  @Get('rutinas/:id')
  public async findRutinasxId(@Param('id', ParseIntPipe) id: number) {
    return await this.usuarioService.findRutinasxId(id);
  }

  @AccessLevel(30)
  @Get('rutinasEstadistica/:id')
  public async findRutinasxIdEstadistica(@Param('id', ParseIntPipe) id: number) {
    return await this.usuarioService.findRutinasxId(id);
  }
  //se usa internamente
  /*  @Get('email/:mail')
   public async findUsuarioByMail(@Param('mail') mail: string) {
     return await this.usuarioService.findUsuarioByMail(mail);
   } */

  @Rol('USUARIO')
  @Patch('update/:id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,) {
    return await this.usuarioService.updateUsuario(id, updateUsuarioDto);
  }

  // Nuevo endpoint solo para la imagen
  @Rol('USUARIO')
  @Patch(':id/imagen-perfil')
  @UseInterceptors(imagenPerfilInterceptor())
  public async updateImagenPerfil(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new ErrorManager('BAD_REQUEST', 'No se ha subido ningún archivo.');
    }

    // Llama a un nuevo método en tu servicio para actualizar solo la imagen de perfil
    const imagenActualizada = await this.usuarioService.updateImagenPerfil(id, file.filename);

    return imagenActualizada;
  }

  //update que viene del admin
  @Rol('ADMIN')
  @Patch('update-basico/:id')
  public async updateBasico(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioAdmDto: UpdateUsuarioAdmDto,) {
    return await this.usuarioService.updateUsuarioBasico(id, updateUsuarioAdmDto);
  }

  @Rol('ADMIN')
  @Delete('delete/:id')
  public async deleteUsuario(@Param('id') id: string) {
    return await this.usuarioService.deleteUsuario(+id);
  }



}
