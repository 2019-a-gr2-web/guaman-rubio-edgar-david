import { Equipo_futbolService } from "./equipo_futbol.service";
import { Equipofutbol } from "./interfaces/equipofutbol";
export declare class Equipo_futbolController {
    private readonly _equipoFutbolService;
    constructor(_equipoFutbolService: Equipo_futbolService);
    mostrarPaginaEquipo(req: any, res: any): void;
    buscarPaginaEquipo(nombreBuscar: any, res: any, req: any): void;
    crearPaginaEquipo(res: any, req: any): void;
    crearEquipoPost(equipofutbol: Equipofutbol, res: any, req: any): void;
    eliminarEquipoDelete(equipofutbol: Equipofutbol, res: any, req: any): void;
}
