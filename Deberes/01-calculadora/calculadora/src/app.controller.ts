import {Controller, Get, Post, Put, Delete, Headers, Response, Body, Query, HttpCode} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/sumar')
  @HttpCode(200)
  sumar(@Headers() headers){
    const num1 = Number(headers.numero1);
    const num2 = Number(headers.numero2);
    if(headers.numero1 == null || headers.numero2 == null){
      return 'Error en los argumentos de la suma'
    }else{
      const suma_total = num1 + num2;
      return `El resultado es ${suma_total}`
    }
  }

  @Post('/restar')
  @HttpCode(201)
  restar(@Body() parametrosCuerpo) {
    const num1 = Number(parametrosCuerpo.numero1);
    const num2 = Number(parametrosCuerpo.numero2);
    if (parametrosCuerpo.numero1 == null || parametrosCuerpo.numero2 == null) {
      return 'Error en los argumentos de la resta'
    } else {
      const resta_total = num1 - num2;
      return `El resultado es ${resta_total}`
    }
  }

  @Put('/multiplicar')
  @HttpCode(202)
  multiplicar(@Query() queryParams, @Response() response){
    const multiplicando = Number(queryParams.numero1);
    const multiplicador = Number(queryParams.numero2);
    if(queryParams.numero1 == null || queryParams.numero2==null){
      return response.status(400).send({mensaje: 'Error en los parámetros de la multiplicación', error:400});
    }else{
      const producto = multiplicando * multiplicador;
      return response.send(`El resultado es ${producto}`)
    }
  }

  @Delete('/dividir')
  @HttpCode(203)
  dividir(@Query() queryParams,@Body() parametrosCuerpo,@Headers() headers, @Response() response){
    if(queryParams.numero1==null && parametrosCuerpo.numero1!=null && headers.numero1!=null){
      const dividendo = Number(parametrosCuerpo.numero1);
      const divisor = Number(headers.numero1);
      const cociente = dividendo/divisor;
      return response.status(203).send(`El resultado es: ${cociente}`)
    }
    else if(parametrosCuerpo.numero1==null && queryParams.numero1!=null && headers.numero1!=null){
      const dividendo = Number(queryParams.numero1);
      const divisor = Number(headers.numero1);
      const cociente = dividendo/divisor;
      return response.status(203).send(`El resultado es: ${cociente}`)
    }
    else if(headers.numero1==null && queryParams.numero1!=null && parametrosCuerpo.numero1!=null){
      const dividendo = Number(queryParams.numero1);
      const divisor = Number(parametrosCuerpo.numero1);
      const cociente = dividendo/divisor;
      return response.status(203).send(`El resultado es: ${cociente}`)
    }
    else{
      return response.status(400).send({mensaje: 'Error en los parámetros de la division', error:400})
    }
  }
}
