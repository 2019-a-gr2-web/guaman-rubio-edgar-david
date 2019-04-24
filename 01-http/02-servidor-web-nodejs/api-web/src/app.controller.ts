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

    /*@Get('/semilla')
    semilla(@Request() request){
        console.log(request.cookies);
        const cookies = request.cookies; // JSON
        const esquemaValidacionNumero = Joi.object().keys({
            numero: Joi.number().integer().required()
        });
        const objetoValidacion = {numero:cookies.numero};
        const resultado = Joi.validate({objetoValidacion, esquemaValidacionNumero});
        if(resultado.error){
            console.log('Resultado:',resultado);
        }else{
            console.log('Numero válido');
        }

        if(cookies.micookie){
            return 'OK'
        }else{
            return 'No'
        }
    }*/

    @Get('inicio')
    inicio(@Response() res){
        return res.render('inicio');
    }
}
function holaMundo(){
    console.log('Hola mundo')
}
const respuestaHolaMundo = holaMundo() //undefined
console.log('Respuesta hola mundo:',respuestaHolaMundo);

function suma(a,b) {
    return a + b;
}
const respuestaSuma = suma(3,5); //8
console.log('Respuesta suma:',respuestaSuma);

//Condicionales
//Truty -> true
//Falsy-> false
/*
if(true){ //Truty
    console.log('Verdadero');
}else{
    console.log('Falso');
}

if(false){ //Falsy
    console.log('Verdadero');
}else{
    console.log('Falso');
}

if(""){ //Falsy
    console.log('Verdadero ""');
}else{
    console.log('Falso ""');
}

if("a"){ //Truty
    console.log('Verdadero ""');
}else{
    console.log('Falso ""');
}
if(0){ //Falsy
    console.log('Verdadero ""');
}else{
    console.log('Falso ""');
}

if("0"){ //Truty
    console.log('Verdadero ""');
}else{
    console.log('Falso ""');
}
if(1){ //Truty
    console.log('Verdadero ""');
}else{
    console.log('Falso ""');
}
if(-1){ //Truty
    console.log('Verdadero ""');
}else{
    console.log('Falso ""');
}
if(null){ //Falsy
    console.log('Verdadero ""');
}else{
    console.log('Falso ""');
}
if({}){
    console.log('Verdadero ""');
}else {
    console.log('Falso ""');
}*/

//Operadores de Arreglos en JS

const arreglo = [function (){return '0'},1,true,null]

const arregloNumerosForEach = [1,2,3,4,5,6];
// 1)Imprimir en consola todos los elementos:

const respuestaForEach = arregloNumerosForEach.forEach(function (valorActual) {
    console.log(`Valor: ${valorActual}`);
});
console.log(`Respuesta ForEach: ${respuestaForEach}`)

// 2) Sumar 2 a los pares y 1 a los impares:

const arregloNumerosMap = [1,2,3,4,5,6];
const rMap = arregloNumerosMap.map((valorActual)=>{
    const esPar = valorActual % 2 == 0;
    if(esPar){
        const nuevoValor = valorActual + 2;
        return nuevoValor;
    }else{
        const nuevoValor = valorActual + 1;
        return nuevoValor;
    }
    });
console.log(`Respuesta MAP: ${rMap}`);

// 3) Encontrar el número 4 dentro del arreglo:

const arregloNumerosFind = [1,2,3,4,5,6];

const rFind = arregloNumerosFind.find((valorActual)=>{return valorActual == 4});
console.log(`Respuesta Find: ${rFind}`);

// 4) Filtrar los números menores a 5:

const arregloNumerosFilter = [1,2,3,4,5,6];
const rFilter = arregloNumerosFilter.filter((valorActual)=>{return valorActual < 5});
console.log(`Respuesta Filter: ${rFilter}`);

// 5) Determinar si los valores son positivos:



// 6) Encontrar algún valor menor a 2:



// 7) Sumar todos los valores dela arreglo:



// 8) Tomar todos los elementos y restarlos de 100:



// 9) Sumar 10 a todos.

// 9.1) Filtrar los valores mayores a 15
// 9.2) Si hay algún número mayor a 30