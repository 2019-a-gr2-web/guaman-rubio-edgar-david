import { Equipofutbol } from "./interfaces/equipofutbol";
export declare class Equipo_futbolService {
    bddEquipo: Equipofutbol[];
    recnum: number;
    constructor();
    crear(nuevoEquipo: Equipofutbol): Equipofutbol;
    buscarPorId(id: number): Equipofutbol;
    buscarPorNombre(nombre: string): Equipofutbol[];
    eliminarPorId(id: number): Equipofutbol[];
    actualizar(equipoActualizado: Equipofutbol, id: number): Equipofutbol[];
}
