import {Body, Controller, Get, Post, Req, Res, Response} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/examen')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('inicio')
  inicio(@Response() response) {
    return response.render(
        'inicio');
  }

  @Post('guardarCookieSeg')
  almacenarCookieUsuario(@Res() res,
                         @Body() nombre:string
  ){
    res.cookie('usuario', nombre, {signed:true});
    res.redirect('/examen/mostrarMenu');
  }

  @Get('mostrarMenu')
  mostrarMenu(@Res() res,
              @Req() req
  ){
    const cookieSeg=req.signedCookies;
    const nombre = cookieSeg.usuario.nombreUsuario;
    res.cookie('usuario', nombre, {signed:true});
    res.render('principal/inicio', /*{nombre:nombre}*/);
  }

  @Get('eliminarCookieSeg')
  eliminarCookieSeg(
      @Res() res,
      @Req() req
  ){
    res.clearCookie('usuario');
    res.redirect('/examen/inicio');
  }
}
