import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos/tragos.entity";
import {DistribuidorModule} from "./distribuidor/distribuidor.module";
import {FiestaModule} from "./fiesta/fiesta.module";
import {FiestaEntity} from "./fiesta/fiesta.entity";
import {DistribuidorEntity} from "./distribuidor/distribuidor.entity";

@Module({
  imports: [
      DistribuidorModule,
      FiestaModule,
      TragosModule,
    TypeOrmModule.forRoot({
      name: 'default', //Nombre por defecto del TYPEORM
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'prueba',
      entities: [TragosEntity, FiestaEntity,DistribuidorEntity],
      synchronize: true,
      insecureAuth:true,
      dropSchema: false
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
