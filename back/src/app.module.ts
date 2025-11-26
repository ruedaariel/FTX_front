
import { Module } from '@nestjs/common';
//import { DatabaseModule } from 'src/modulo-database/database.module';
import { DatabaseModule } from './modulo-database/database.module';

import { UsuarioModule } from './usuario/usuario.module';
import { DatosPersonalesModule } from './usuario-datos-personales/datos-personales.module';
import { DatosFisicosModule } from './usuario-datos-fisicos/usuario-datos-fisicos.module';
import { EjercicioBasicoModule } from './ejercicio-basico/ejercicio-basico.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { RutinaModule } from './rutina/rutina.module';
import { SemanaModule } from './semana/semana.module';
import { DiaModule } from './dia/dia.module';
import { EjercicioRutinaModule } from './ejercicio-rutina/ejercicio-rutina.module';
import { PlanModule } from './plan/plan.module';
import { EmailModule } from './shared/email/email.module';
import { PagosModule } from './pagos/pagos.module';
import { AuthModule } from './auth/auth.module';




@Module({
  imports: [
     ConfigModule.forRoot({
      envFilePath: `.${process.env.MODE_ENV || 'develop'}.env`,
      isGlobal: true,
    }),
    //para acceder a las imagenes con la ruta completa
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Esto expone la carpeta en la URL
    }),

    DatabaseModule,
   
    UsuarioModule,
   
    DatosPersonalesModule,
   
    DatosFisicosModule,
   
    EjercicioBasicoModule,
   
    RutinaModule,
   
    SemanaModule,
   
    DiaModule,
   
    EjercicioRutinaModule,
   
    PlanModule,
   
    EmailModule,
   
    PagosModule,
   
    AuthModule]

})
export class AppModule {
  
}
