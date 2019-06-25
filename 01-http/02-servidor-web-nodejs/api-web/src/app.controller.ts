import {
    Controller,
    Delete,
    Get,
    HttpCode,
    Post,
    Put,
    Headers,
    Query,
    Param,
    Body,
    Response,
    Request,
    Session, Res
} from '@nestjs/common';
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

  @Get('session')
  session(@Query('nombre') nombre, @Session() session){
      console.log(session);
      session.autenticado = true;
      session.nombreUsuario = nombre;
      return 'ok'
  }

  @Get('login')
  loginVista(
      @Res() res
  ){
      res.render('login');
  }

  @Post('login')
  login(@Body() usuario,
        @Session() session,
        @Res() res)
  {
      if(usuario.username ==='edgar' && usuario.password === '12345'){
          //Guardar datos en la session
          session.username = usuario.username;
          res.redirect('/protegida')

        }else{
          res.status(400);
          res.send({mensaje:'Error login',error:400})
      }
  }

  @Get('protegida')
  protegida(@Session() session,
            @Res() res)
  {
      if(session.username){
          res.render('protegida',{nombre:session.username});
      }else{
          res.redirect('/api/login');
      }
  }

    @Get('logout')
    logout(
        @Res() res,
        @Session() session,
    ){
        session.username = undefined;
        session.destroy();
        res.redirect('/api/login');
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
    semilla(
        @Request() request,
        @Response() response
    ) {
        console.log(request.cookies);
        const cookies = request.cookies; // JSON

        const esquemaValidacionNumero = Joi
            .object()
            .keys({
                numero: Joi.number().integer().required()
            });

        const objetoValidacion = {
            numero: cookies.numero
        };
        const resultado = Joi.validate(objetoValidacion,
            esquemaValidacionNumero);

        if (resultado.error) {
            console.log('Resultado: ', resultado);
        } else {
            console.log('Numero valido');
        }

        const cookieSegura = request.signedCookies.fechaServidor;
        if (cookieSegura) {
            console.log('Cookie segura', cookieSegura);
        } else {
            console.log('No es valida esta cookie');
        }

        if (cookies.micookie) {

            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos + 1);

            response.cookie(
                'fechaServidor',      // NOMBRE (key)
                new Date().getTime(),  // VALOR  (value)
                {    // OPCIONES
                    // expires: horaFechaServidor
                    signed: true
                }
            );

            return response.send('ok');
        } else {
            return response.send(':(');
        }
    }

    @Get('inicio') //endpoint
    inicio(@Response() res){
        return res.render('inicio',{estaVivo:true});
    }

    @Get('peliculas') //endpoint
    peliculas(@Response() res){
        return res.render('peliculas/inicio',{});
    }

    @Get('estilos') //endpoint
    estilos(@Response() res){
        return res.render('peliculas/estilos',{});
    }

}
/*
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
*/

const arreglo = [function (){return '0'},1,true,null]

const arregloNumerosForEach = [1,2,3,4,5,6];
// 1)Imprimir en consola todos los elementos:

const respuestaForEach = arregloNumerosForEach.forEach(function (valorActual) {
    console.log(`Valor: ${valorActual}`);
});
console.log(`Respuesta ForEach: ${respuestaForEach}`)

// 2) Sumar 2 a los pares y 1 a los impares:

//map nos sirve para transformar los valores del arreglo.

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

const arregloNumerosEvery = [1,2,3,4,5,6];
//El operador every responde al operador AND lógico
const rEvery = arregloNumerosEvery.every((valorActual)=>{return valorActual >0});
console.log(`Respuesta Every: ${rEvery}`);

// 6) Encontrar algún valor menor a 2:

const arregloNumerosSome = [1,2,3,4,5,6];
//El operador every responde al operador OR  lógico
const rSome = arregloNumerosEvery.some((valorActual)=>{return valorActual <2});
console.log(`Respuesta Some: ${rSome}`);

// 7) Sumar todos los valores del arreglo:

const arregloNumerosReduce = [1,2,-3,4,-5,6];
const valorEmpiezaCalculo = 0;
const rReduce = arregloNumerosReduce.reduce((acumulado, valorActual)=>{return acumulado+valorActual},valorEmpiezaCalculo);
console.log(`Respuesta Reduce: ${rReduce}`);

// <4
//10% + 5
//>=4
//15% + 3

const arregloNumerosPorcentaje = [1,2,3,4,5,6];
const valorEmpieza = 0;
const resReduce = arregloNumerosPorcentaje.reduce((acumulado, valorActual)=>{
    if(valorActual<4){
        return acumulado + valorActual*1.1 + 5;
    }
    else{
        return acumulado + valorActual*1.15 + 3;
    }
    return acumulado+valorActual},valorEmpieza);

console.log(`Respuesta aumento: ${resReduce}`);

// 8) Tomar todos los elementos y restarlos de 100:

const arregloNumerosResta = [1,2,3,4,5,6];
const valorComienza = 100;
const respuesta = arregloNumerosResta.reduce((acumulado, valorActual)=>{
    return acumulado-valorActual},valorComienza);

console.log(`Respuesta aumento: ${respuesta}`);

// 9) Sumar 10 a todos.
// 9.1) Filtrar los valores mayores a 15
// 9.2) Si hay algún número mayor a 30

const arregloEjercicio = [1,2,3,4,5,6];
const resultado = arregloEjercicio.map((valorActual)=>{return valorActual+10})
    .filter((valorActual=>{return valorActual>15})).some((valorActual)=>{return valorActual >30})
console.log(`Respuesta ejercicio: ${resultado}`);