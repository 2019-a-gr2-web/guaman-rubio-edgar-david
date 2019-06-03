import {Injectable} from "@nestjs/common";
import {Pokemon} from "./interfaces/pokemon";


@Injectable()
export class PokemonService {
    bddPokemon: Pokemon[] = [];
    recnum = 1;
    entrenadorId = 0;

    constructor(){
    }

    crear(nuevoPokemon: Pokemon): Pokemon {
        nuevoPokemon.id = this.recnum;
        nuevoPokemon.entrenadorId = this.entrenadorId;
        this.recnum++;
        this.bddPokemon.push(nuevoPokemon);
        return nuevoPokemon;
    }

    buscarPorIdEntrenador(id: number): Pokemon[] {
        this.entrenadorId = id;
        const listaFilter = this.bddPokemon.filter(
            (pokemon) => {
                return pokemon.entrenadorId === id;
            }
        );
        return listaFilter;
    }

    buscarPorIdIngresado(): Pokemon[] {
        const lstFilter = this.bddPokemon.filter(
            (pokemon) => {
                return pokemon.entrenadorId === this.entrenadorId;
            }
        );
        return lstFilter;
    }

    buscarPorNombre(nombre: string): Pokemon[]{
        const elementFound = this.bddPokemon.find(
            (pokemon) => {
                return pokemon.nombrePokemon === nombre;
            }
        );
        if(elementFound === undefined){
            return this.bddPokemon;
        }else{
            const listaPokemon : Pokemon[] = [];
            listaPokemon.push(elementFound);
            return listaPokemon;
        }
    }

    eliminarPorId(id: number): Pokemon[] {
        const indice = this.bddPokemon.findIndex(
            (pokemon) => {
                return pokemon.id === id
            }
        );
        this.bddPokemon.splice(indice, 1);
        return this.bddPokemon;
    }

    actualizar(pokemonActualizado: Pokemon, id: number): Pokemon[] {

        const indice = this.bddPokemon.findIndex(
            (pokemon) => {
                return pokemon.id === id
            }
        );
        pokemonActualizado.id = this.bddPokemon[indice].id;
        this.bddPokemon[indice] = pokemonActualizado;
        return this.bddPokemon;
    }
}
