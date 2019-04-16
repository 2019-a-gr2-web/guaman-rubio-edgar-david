import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //Método http
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(200)

  @Post() //Método http
  postHello(): string {
    return 'Hola mundo en post';

  }
}
