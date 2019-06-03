import {Injectable} from "@nestjs/common";
import {Entrenador} from "./interfaces/entrenador";

@Injectable()
export class EntrenadorService {
    bddEntrenador: Entrenador[] = [];
    recnum = 1;

    constructor(){
    }

    crear(nuevoEntrenador: Entrenador): Entrenador {
        nuevoEntrenador.id = this.recnum;
        this.recnum++;
        this.bddEntrenador.push(nuevoEntrenador);
        return nuevoEntrenador;
    }

    buscarPorId(id: number): Entrenador {
        return this.bddEntrenador.find(
            (entrenador) => {
                return entrenador.id === id;
            }
        );
    }

    buscarPorNombre(nombre: string): Entrenador[]{
        const elementFound = this.bddEntrenador.find(
            (entrenador) => {
                return entrenador.nombres === nombre;
            }
        );
        if(elementFound === undefined){
            return this.bddEntrenador;
        }else{
            const listaEntrenador : Entrenador[] = [];
            listaEntrenador.push(elementFound);
            return listaEntrenador;
        }
    }

    eliminarPorId(id: number): Entrenador[] {
        const indice = this.bddEntrenador.findIndex(
            (entrenador) => {
                return entrenador.id === id
            }
        );
        this.bddEntrenador.splice(indice, 1);
        return this.bddEntrenador;
    }

    actualizar(entrenadorActualizado: Entrenador, id: number): Entrenador[] {

        const indice = this.bddEntrenador.findIndex(
            (entrenador) => {
                return entrenador.id === id
            }
        );
        entrenadorActualizado.id = this.bddEntrenador[indice].id;
        this.bddEntrenador[indice] = entrenadorActualizado;
        return this.bddEntrenador;
    }
}
