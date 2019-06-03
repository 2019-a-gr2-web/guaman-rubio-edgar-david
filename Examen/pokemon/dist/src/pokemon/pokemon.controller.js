"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const pokemon_service_1 = require("./pokemon.service");
let PokemonController = class PokemonController {
    constructor(_pokemonService) {
        this._pokemonService = _pokemonService;
    }
    mostrarPaginaPokemon(entrenadorId, res, req) {
        console.log(entrenadorId.entrenadorId);
        if (entrenadorId.padreId === undefined) {
            const arregloPokemon = this._pokemonService.buscarPorIdIngresado();
            const cookieSeg = req.signedCookies;
            const nombre = cookieSeg.usuario;
            res.cookie('usuario', nombre, { signed: true });
            res.render('pokemon/inicio', { arregloPokemon: arregloPokemon, nombre: nombre });
        }
        else {
            entrenadorId.entrenadorId = Number(entrenadorId.entrenadorId);
            const arregloPokemon = this._pokemonService.buscarPorIdEntrenador(entrenadorId.entrenadorId);
            const cookieSeg = req.signedCookies;
            const nombre = cookieSeg.usuario;
            res.cookie('usuario', nombre, { signed: true });
            res.render('pokemon/inicio', { arregloPokemon: arregloPokemon, nombre: nombre });
        }
    }
    buscarPaginaPokemon(nombreBuscar, res, req) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        const arregloPokemon = this._pokemonService.buscarPorNombre(nombreBuscar.nombrePokemon);
        res.cookie('usuario', nombre, { signed: true });
        res.render('pokemon/inicio', { arregloPokemon: arregloPokemon, nombre: nombre });
    }
    crearPaginaPokemon(res, entrenadorId, req) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        res.cookie('usuario', nombre, { signed: true });
        res.render('pokemon/crear', { nombre: nombre });
    }
    crearPokemonPost(pokemon, res, req) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        pokemon.numeroPokemon = Number(pokemon.numeroPokemon);
        pokemon.fechaCaptura = new Date(pokemon.fechaCaptura);
        pokemon.nivel = Number(pokemon.nivel);
        this._pokemonService.crear(pokemon);
        res.cookie('usuario', nombre, { signed: true });
        res.redirect('/api/pokemon/pokemones');
    }
    eliminarEquipoDelete(pokemon, res, req) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        pokemon.id = Number(pokemon.id);
        const arregloEntrenadorEliminado = this._pokemonService.eliminarPorId(pokemon.id);
        res.cookie('usuario', nombre, { signed: true });
        res.redirect('/api/pokemon/pokemones');
    }
};
__decorate([
    common_1.Get('pokemones'),
    __param(0, common_1.Query()),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "mostrarPaginaPokemon", null);
__decorate([
    common_1.Get('buscarPokemon'),
    __param(0, common_1.Query()),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "buscarPaginaPokemon", null);
__decorate([
    common_1.Get('crearPaginaPokemon'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "crearPaginaPokemon", null);
__decorate([
    common_1.Post('crearPokemon'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "crearPokemonPost", null);
__decorate([
    common_1.Post('eliminarPokemon'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "eliminarEquipoDelete", null);
PokemonController = __decorate([
    common_1.Controller('/api/pokemon'),
    __metadata("design:paramtypes", [pokemon_service_1.PokemonService])
], PokemonController);
exports.PokemonController = PokemonController;
//# sourceMappingURL=pokemon.controller.js.map