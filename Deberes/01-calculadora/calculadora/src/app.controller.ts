import {Controller, Get, Post, Put, Delete, Headers, Body, Query, HttpCode, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/sumar')
  @HttpCode(200)
  sumar(@Headers() headers, @Request() request, @Response() response ){
    const num1 = Number(headers.numero1);
    const num2 = Number(headers.numero2);
    if(headers.numero1 == null || headers.numero2 == null){
      return response.send('Error en los argumentos de la suma');
    }else{
      const cookie = request.cookies;
      const suma_total = num1 + num2;
      response.cookie('Usuario','Edgar');
      return response.send({'El resultado es:': suma_total.toString(),'Usuario:':cookie.Usuario})
    }
  }

  @Post('/restar')
  @HttpCode(201)
  restar(@Body() parametrosCuerpo, @Request() request, @Response() response) {
    const num1 = Number(parametrosCuerpo.numero1);
    const num2 = Number(parametrosCuerpo.numero2);
    if (parametrosCuerpo.numero1 == null || parametrosCuerpo.numero2 == null) {
      return response.send('Error en los argumentos de la suma');
    } else{
      const cookie = request.cookies;
      const resta_total = num1 - num2;
      response.cookie('Usuario','Edgar');
      return response.send({'El resultado es:': resta_total.toString(),'Usuario:':cookie.Usuario})
    }
  }


  @Put('/multiplicar')
  @HttpCode(202)
  multiplicar(@Query() queryParams,@Request() request, @Response() response){
    const multiplicando = Number(queryParams.numero1);
    const multiplicador = Number(queryParams.numero2);
    if(queryParams.numero1 == null || queryParams.numero2==null){
      return response.status(400).send({mensaje: 'Error en los parámetros de la multiplicación', error:400});
    }else{
      const cookie = request.cookies;
      const producto = multiplicando * multiplicador;
      response.cookie('Usuario','Edgar');
      return response.send({'El resultado es:': producto.toString(),'Usuario:':cookie.Usuario})
    }
  }

  @Delete('/dividir')
  @HttpCode(203)
  dividir(@Query() queryParams,@Body() parametrosCuerpo,@Headers() headers, @Response() response, @Request() request){
    if(queryParams.numero1==null && parametrosCuerpo.numero1!=null && headers.numero1!=null){
      const cookie = request.cookies;
      response.cookie('Usuario','Edgar');
      const dividendo = Number(parametrosCuerpo.numero1);
      const divisor = Number(headers.numero1);
      const cociente = dividendo/divisor;
      return response.send({'El resultado es:': cociente.toString(),'Usuario:':cookie.Usuario})
    }
    else if(parametrosCuerpo.numero1==null && queryParams.numero1!=null && headers.numero1!=null){
      const cookie = request.cookies;
      response.cookie('Usuario','Edgar');
      const dividendo = Number(queryParams.numero1);
      const divisor = Number(headers.numero1);
      const cociente = dividendo/divisor;
      return response.send({'El resultado es:': cociente.toString(),'Usuario:':cookie.Usuario})
    }
    else if(headers.numero1==null && queryParams.numero1!=null && parametrosCuerpo.numero1!=null){
      const cookie = request.cookies;
      response.cookie('Usuario','Edgar');
      const dividendo = Number(queryParams.numero1);
      const divisor = Number(parametrosCuerpo.numero1);
      const cociente = dividendo/divisor;
      return response.send({'El resultado es:': cociente.toString(),'Usuario:':cookie.Usuario})
    }
    else{
      return response.status(400).send({mensaje: 'Error en los parámetros de la division', error:400})
    }
  }
}
