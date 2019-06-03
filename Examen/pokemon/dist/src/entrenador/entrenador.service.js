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
let EntrenadorService = class EntrenadorService {
    constructor() {
        this.bddEntrenador = [];
        this.recnum = 1;
    }
    crear(nuevoEntrenador) {
        nuevoEntrenador.id = this.recnum;
        this.recnum++;
        this.bddEntrenador.push(nuevoEntrenador);
        return nuevoEntrenador;
    }
    buscarPorId(id) {
        return this.bddEntrenador.find((entrenador) => {
            return entrenador.id === id;
        });
    }
    buscarPorNombre(nombre) {
        const elementFound = this.bddEntrenador.find((entrenador) => {
            return entrenador.nombres === nombre;
        });
        if (elementFound === undefined) {
            return this.bddEntrenador;
        }
        else {
            const listaEntrenador = [];
            listaEntrenador.push(elementFound);
            return listaEntrenador;
        }
    }
    eliminarPorId(id) {
        const indice = this.bddEntrenador.findIndex((entrenador) => {
            return entrenador.id === id;
        });
        this.bddEntrenador.splice(indice, 1);
        return this.bddEntrenador;
    }
    actualizar(entrenadorActualizado, id) {
        const indice = this.bddEntrenador.findIndex((entrenador) => {
            return entrenador.id === id;
        });
        entrenadorActualizado.id = this.bddEntrenador[indice].id;
        this.bddEntrenador[indice] = entrenadorActualizado;
        return this.bddEntrenador;
    }
};
EntrenadorService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], EntrenadorService);
exports.EntrenadorService = EntrenadorService;
//# sourceMappingURL=entrenador.service.js.map