import {Entrenador} from "../../entrenador/interfaces/entrenador";

export interface Pokemon {
    id?:number;
    numeroPokemon: number;
    nombrePokemon: String;
    poderEspecialUno: String;
    poderEspecialDos: String;
    fechaCaptura: Date;
    nivel: number;
    entrenadorId: number;
}