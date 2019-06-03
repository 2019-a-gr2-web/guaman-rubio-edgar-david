import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EntrenadorModule} from "./entrenador/entrenador.module";

@Module({
  imports: [EntrenadorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
