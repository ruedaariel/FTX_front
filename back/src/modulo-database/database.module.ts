// src/moduloDatabase/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: `.${process.env.MODE_ENV || 'develope'}.env`,
    //   isGlobal: true,
    // }),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({   //me daba error al cargar la base de datos y se suponia que no tenia las variables
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT') || 3306,
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
        synchronize: false,
        migrationsRun: true,
        logging:  false,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
  ],

})
export class DatabaseModule {}


