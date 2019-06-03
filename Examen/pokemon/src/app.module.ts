import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EntrenadorModule} from "./entrenador/entrenador.module";
import {PokemonModule} from "./pokemon/pokemon.module";

@Module({
  imports: [EntrenadorModule, PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
