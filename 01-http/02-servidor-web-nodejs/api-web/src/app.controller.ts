import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Response, Request} from '@nestjs/common';
import { AppService } from './app.service';

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
    semilla(@Request() request){
      console.log(request.cookies);
      const cookies = request.cookies;
      if(cookies.micookie){
        return 'OK';
      }else{
        return 'Sorry men';
      }
    }
}

//un json no es lo mismo que un objeto javascript
const json = [{
    "nombre":"Edgar",
    "apellido":"Guaman",
    "edad":23,
    "sueldo":46.54,
    "casado": false,
    "hijos": null,
    "mascotas":["firulais", 1, 1.34, false, null, {"nombre":"pechirojo"}]
}]

let objeto:any = {
  propiedad:'valor',
  propiedadDos:'valor2'
}

objeto.propiedad //valor
objeto.propiedadDos //valor2

//Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'valor 3';
delete objeto.propiedadTres;
objeto.propiedadTres = undefined;



