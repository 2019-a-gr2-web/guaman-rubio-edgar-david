import {Controller, Get, Post, Res, Body, Query, Put, Delete, Req} from "@nestjs/common";
import {EntrenadorService} from "./entrenador.service";
import {Entrenador} from "./interfaces/entrenador";

@Controller('/api/entrenador')
export class EntrenadorController {
    constructor(private readonly entrenadorService: EntrenadorService) {
    }

    @Get('entrenadores')
    entrenadores(@Req() req,
                        @Res() res){
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        console.log(nombre);
        res.cookie('usuario', nombre, {signed:true});
        const arregloEntrenadores = this.entrenadorService.bddEntrenador;
        res.render('entrenador/inicio', {arregloEntrenadores:arregloEntrenadores, nombre:nombre});
    }

    @Get('buscarEntrenador')
    buscarPaginaEquipo(@Query() nombreBuscar,
                       @Res() res,
                       @Req() req){
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        const arregloEntrenadores = this.entrenadorService.buscarPorNombre(nombreBuscar.nombre);
        res.cookie('usuario', nombre, {signed:true});
        res.render('entrenador/inicio', {arregloEntrenadores:arregloEntrenadores, nombre:nombre});
    }

    @Get('crearPaginaEntrenador')
    crearPaginaEquipo(@Res() res,
                      @Req() req){
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        res.cookie('usuario', nombre, {signed:true});
        res.render('entrenador/crear',{nombre:nombre});
    }

    @Post('crearEntrenador')
    crearEquipoPost(
        @Body() entrenador: Entrenador,
        @Res() res,
        @Req() req
    ) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        entrenador.numeroMedallas = Number(entrenador.numeroMedallas);
        entrenador.fechaNacimiento = new Date(entrenador.fechaNacimiento);
        this.entrenadorService.crear(entrenador);
        res.cookie('usuario', nombre, {signed:true});
        res.redirect('/api/entrenador/entrenadores');
    }

    @Post('eliminarEntrenador')
    eliminarEquipoDelete(@Body() entrenador: Entrenador,
                         @Res() res,
                         @Req() req)
    {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        entrenador.id= Number(entrenador.id);
        const arregloEntrenadorEliminado = this.entrenadorService.eliminarPorId(entrenador.id);
        res.cookie('usuario', nombre, {signed:true});
        res.redirect('/api/entrenador/entrenadores');
    }
}
