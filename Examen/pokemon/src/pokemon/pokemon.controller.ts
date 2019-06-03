import {Controller, Get, Post, Res, Body, Query, Put, Delete, Req} from "@nestjs/common";
import {PokemonService} from "./pokemon.service";
import {Pokemon} from "./interfaces/pokemon";


@Controller('/api/pokemon')
export class PokemonController {
    constructor(private readonly _pokemonService: PokemonService) {
    }

    @Get('pokemones')
    mostrarPaginaPokemon(@Query() entrenadorId,
                         @Res() res,
                         @Req() req){
        console.log(entrenadorId.entrenadorId);
        if(entrenadorId.padreId === undefined){
            const arregloPokemon = this._pokemonService.buscarPorIdIngresado();
            const cookieSeg = req.signedCookies;
            const nombre = cookieSeg.usuario;
            res.cookie('usuario',nombre, {signed:true});
            res.render('pokemon/inicio', {arregloPokemon:arregloPokemon,nombre:nombre});
        }else{
            entrenadorId.entrenadorId = Number(entrenadorId.entrenadorId);
            const arregloPokemon = this._pokemonService.buscarPorIdEntrenador(entrenadorId.entrenadorId);
            const cookieSeg = req.signedCookies;
            const nombre = cookieSeg.usuario;
            res.cookie('usuario',nombre, {signed:true});
            res.render('pokemon/inicio', {arregloPokemon:arregloPokemon,nombre:nombre});
        }

    }

    @Get('buscarPokemon')
    buscarPaginaPokemon(@Query() nombreBuscar,
                        @Res() res,
                        @Req() req){
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        const arregloPokemon = this._pokemonService.buscarPorNombre(nombreBuscar.nombrePokemon);
        res.cookie('usuario', nombre, {signed:true});
        res.render('pokemon/inicio', {arregloPokemon:arregloPokemon,nombre:nombre});
    }

    @Get('crearPaginaPokemon')
    crearPaginaPokemon(@Res() res,
                       @Query() entrenadorId,
                       @Req() req){
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        res.cookie('usuario',nombre, {signed:true});
        res.render('pokemon/crear',{nombre:nombre});
    }

    @Post('crearPokemon')
    crearPokemonPost(
        @Body() pokemon: Pokemon,
        @Res() res,
        @Req() req
    ) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        pokemon.numeroPokemon = Number(pokemon.numeroPokemon);
        pokemon.fechaCaptura = new Date(pokemon.fechaCaptura);
        pokemon.nivel = Number(pokemon.nivel);
        this._pokemonService.crear(pokemon);
        res.cookie('usuario',nombre, {signed:true});
        res.redirect('/api/pokemon/pokemones');
    }

    @Post('eliminarPokemon')
    eliminarEquipoDelete(@Body() pokemon: Pokemon,
                         @Res() res,
                         @Req() req)
    {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        pokemon.id = Number(pokemon.id);
        const arregloEntrenadorEliminado = this._pokemonService.eliminarPorId(pokemon.id);
        res.cookie('usuario',nombre, {signed:true});
        res.redirect('/api/pokemon/pokemones');
    }
}
