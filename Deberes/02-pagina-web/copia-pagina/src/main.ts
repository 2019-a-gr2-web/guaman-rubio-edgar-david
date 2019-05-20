import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as express from 'express'
import * as path from 'path'
import * as favicon from 'serve-favicon'

async function bootstrap() {

  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'vistas'));
  app.use(express.static('recursos'))
  await app.listen(3000);
}
bootstrap();
