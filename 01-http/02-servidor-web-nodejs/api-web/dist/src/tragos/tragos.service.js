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
const typeorm_1 = require("@nestjs/typeorm");
const tragos_entity_1 = require("./tragos.entity");
const typeorm_2 = require("typeorm");
let TragosService = class TragosService {
    constructor(_tragosRepository) {
        this._tragosRepository = _tragosRepository;
        this.bddTragos = [];
        this.recnum = 1;
    }
    crear(nuevoTrago) {
        const objetoEntidad = this._tragosRepository
            .create(nuevoTrago);
        return this._tragosRepository.save(objetoEntidad);
    }
    buscar(parametrosBusqueda) {
        return this._tragosRepository.find(parametrosBusqueda);
    }
    actualizar(idTrago, nuevoTrago) {
        nuevoTrago.id = idTrago;
        const tragoEntity = this._tragosRepository.create(nuevoTrago);
        return this._tragosRepository.save(tragoEntity);
    }
    eliminarId(id) {
        const tragoaEliminar = this._tragosRepository
            .create({ id: id });
        return this._tragosRepository.remove(tragoaEliminar);
    }
    buscarPorId(idTrago) {
        return this._tragosRepository.findOne(idTrago);
    }
    eliminarPorId(id) {
        const indice = this.bddTragos.findIndex((trago) => { return trago.id === id; });
        this.bddTragos.splice(indice, 1);
        return this.bddTragos;
    }
    buscarPorNombre(nombre) {
        return this.bddTragos.find((trago) => {
            return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
        });
    }
};
TragosService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(tragos_entity_1.TragosEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TragosService);
exports.TragosService = TragosService;
//# sourceMappingURL=tragos.service.js.map