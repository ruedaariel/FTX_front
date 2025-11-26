import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS } from './constantes';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import 'reflect-metadata';

/* import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');
process.on('uncaughtException', err => {
  logger.error('uncaughtException', err as any);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  logger.error('unhandledRejection', reason as any);
  process.exit(1);
});

 */
async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ //convierte automaticamente de cadena a numero o de cadena a boolean
    transformOptions: {
      enableImplicitConversion: true,},
     //elimina propiedades no declaradas en el DTO
      whitelist: true,
      //devuelve error si vienen campos no permitidos (más estricto).
      forbidNonWhitelisted: true,
      
     transform:true, 
    
  }));

  //para que funcione bien el @Exclude, etc y las transformaciones
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  //obtiene la configuracion de variables de entorno y accede al puerto
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.enableCors(CORS);
  // Habilitar CORS

  //establece un prefijo para toda la aplicacion y evita que se mezclen rutas de be y fe
  app.setGlobalPrefix('apiFtx');

    //Swagger para documentacion
  const config = new DocumentBuilder()
    .setTitle('FTX API')
    .setDescription('Aplicacion de gestion para personal Trainner y sus clientes')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('docs',app, document);

  //busca la carpeta uploads y lo sirve como contenido estatico (imagnes, pdf, css, etc), permite el acceso desde el front
  app.use('/uploads', express.static('uploads'));

  await app.listen(port);
 
}
bootstrap();
 



