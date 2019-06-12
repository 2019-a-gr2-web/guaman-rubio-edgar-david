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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let PokemonService = class PokemonService {
    constructor() {
        this.bddPokemon = [];
        this.recnum = 1;
        this.entrenadorId = 0;
    }
    crear(nuevoPokemon) {
        nuevoPokemon.id = this.recnum;
        this.entrenadorId = nuevoPokemon.entrenadorId;
        this.recnum++;
        this.bddPokemon.push(nuevoPokemon);
        return nuevoPokemon;
    }
    buscarPorIdEntrenador(id) {
        this.entrenadorId = id;
        const listaFilter = this.bddPokemon.filter((pokemon) => {
            return pokemon.entrenadorId === id;
        });
        return listaFilter;
    }
    buscarPorIdIngresado() {
        const lstFilter = this.bddPokemon.filter((pokemon) => {
            console.log(this.entrenadorId);
            return pokemon.entrenadorId === this.entrenadorId;
        });
        return lstFilter;
    }
    buscarPorNombre(nombre) {
        const elementFound = this.bddPokemon.find((pokemon) => {
            return pokemon.nombrePokemon === nombre;
        });
        if (elementFound === undefined) {
            return this.bddPokemon;
        }
        else {
            const listaPokemon = [];
            listaPokemon.push(elementFound);
            return listaPokemon;
        }
    }
    eliminarPorId(id) {
        const indice = this.bddPokemon.findIndex((pokemon) => {
            return pokemon.id === id;
        });
        this.bddPokemon.splice(indice, 1);
        return this.bddPokemon;
    }
    actualizar(pokemonActualizado, id) {
        const indice = this.bddPokemon.findIndex((pokemon) => {
            return pokemon.id === id;
        });
        pokemonActualizado.id = this.bddPokemon[indice].id;
        this.bddPokemon[indice] = pokemonActualizado;
        return this.bddPokemon;
    }
};
PokemonService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], PokemonService);
exports.PokemonService = PokemonService;
//# sourceMappingURL=pokemon.service.js.map