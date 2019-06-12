import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos/tragos.entity";

@Module({
  imports: [TragosModule,
    TypeOrmModule.forRoot({
      name: 'default', //Nombre por defecto del TYPEORM
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'prueba',
      entities: [TragosEntity],
      synchronize: true,
      insecureAuth:true
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
