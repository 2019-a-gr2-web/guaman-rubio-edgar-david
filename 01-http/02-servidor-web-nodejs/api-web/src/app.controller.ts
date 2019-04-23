import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Response, Request} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';

//Instalar la librería joi mediante npm i @hapi/joi

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}


//@Controller(segmentoAccion)

    /*Segmento inicial : /api
  1)Segmento Accion: GET 'hello-world'
  2)Segmento Accion: POST 'hola-mundo'
  3)Segmento Accion: PUT 'salut-monde'
  4)Segmento Accion: DELETE 'ciao-mondo'
  */

  @Get('/hello-world') //Método http
  helloWorld(): string {
    return 'hello world';
  }

  @HttpCode(200)

//http://localhost:3000/api

  @Post('/hola-mundo') //Método http
  holaMundo(): string {
    return 'Hola mundo en post';
  }

  @Put('/salut-monde') //Método http
  salutMonde(): string {
    return 'salut monde en put';
  }

  @Delete('/ciao-mondo') //Método http
  ciaoMondo(): string {
    return 'ciao mondo en delete';
  }

  @Get('/adivina') //Método http
  adivina(@Headers() headers): string {
    console.log('Headers:', headers);
    const numeroRandomico = Math.round(Math.random()*10)
    const numeroDeCabecera = Number(headers.numero);
    if(numeroDeCabecera == numeroRandomico){
      return 'OK';
    }else{
      return 'No mijo'
    }
  }

    @Get('/consultar')
    consultar(@Query() queryParams){
    console.log(queryParams);
    if(queryParams.nombre){
      return `Hola ${queryParams.nombre}`
    }else{
      return 'Hola desconocido'
    }
    }

    @Get('/ciudad/:idCiudad')
    ciudad(@Param() parametrosRuta){
      switch (parametrosRuta.idCiudad.toLowerCase()) {
          case 'quito':
            return 'Que fueef';
          case 'guayaqui':
            return 'Que maah oe';
          default:
            return 'Buenas tardes';
      }
    }

    @Post('/registroComida')
    registroComida(@Body() parametrosCuerpo, @Response() response){

      if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
        const cantidad = Number(parametrosCuerpo.cantidad)
        if(cantidad > 1){
          response.set('Premio','Fanesca');
        }
        return response.send({mensaje: "Registro creado"});
      }else{
        return response.status(400).send({mensaje: "ERROR, no envia nombre o cantidad", error: 400});
      }
    }

    @Get('/semilla')
    semilla(@Request() request,@Response() response){
        console.log(request.cookies);
        const cookies = request.cookies; // JSON
        const esquemaValidacionNumero = Joi.object().keys({numero: Joi.number().integer().required()});
        const objetoValidacion = {numero: cookies.numero};
        const resultado = Joi.validate(objetoValidacion,esquemaValidacionNumero);

        if (resultado.error) {
            console.log('Resultado: ', resultado);
        } else {
            console.log('Numero valido');
        }

        const cookieSegura = request.signedCookies.fechaServidor;
        if (cookieSegura) {
            console.log('Cookie segura');
        } else {
            console.log('No es valida esta cookie');
        }

        if(cookies.micookie) {

            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos + 1);

            response.cookie(
                'fechaServidor',      // NOMBRE (key)
                new Date().getTime(),  // VALOR  (value)
                {    // OPCIONES
                    // expires: horaFechaServidor
                    signed: true
                });
            return response.send('ok');
        } else {
            return response.send(':(');
        }
    }
}