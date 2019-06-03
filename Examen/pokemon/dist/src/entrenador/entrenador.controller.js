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
const entrenador_service_1 = require("./entrenador.service");
let EntrenadorController = class EntrenadorController {
    constructor(entrenadorService) {
        this.entrenadorService = entrenadorService;
    }
    entrenadores(req, res) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        console.log(nombre);
        res.cookie('usuario', nombre, { signed: true });
        const arregloEntrenadores = this.entrenadorService.bddEntrenador;
        res.render('entrenador/inicio', { arregloEntrenadores: arregloEntrenadores, nombre: nombre });
    }
    buscarPaginaEquipo(nombreBuscar, res, req) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        const arregloEntrenadores = this.entrenadorService.buscarPorNombre(nombreBuscar.nombre);
        res.cookie('usuario', nombre, { signed: true });
        res.render('entrenador/inicio', { arregloEntrenadores: arregloEntrenadores, nombre: nombre });
    }
    crearPaginaEquipo(res, req) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        res.cookie('usuario', nombre, { signed: true });
        res.render('entrenador/crear', { nombre: nombre });
    }
    crearEquipoPost(entrenador, res, req) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        entrenador.numeroMedallas = Number(entrenador.numeroMedallas);
        entrenador.fechaNacimiento = new Date(entrenador.fechaNacimiento);
        this.entrenadorService.crear(entrenador);
        res.cookie('usuario', nombre, { signed: true });
        res.redirect('/api/entrenador/entrenadores');
    }
    eliminarEquipoDelete(entrenador, res, req) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        entrenador.id = Number(entrenador.id);
        const arregloEntrenadorEliminado = this.entrenadorService.eliminarPorId(entrenador.id);
        res.cookie('usuario', nombre, { signed: true });
        res.redirect('/api/entrenador/entrenadores');
    }
};
__decorate([
    common_1.Get('entrenadores'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EntrenadorController.prototype, "entrenadores", null);
__decorate([
    common_1.Get('buscarEntrenador'),
    __param(0, common_1.Query()),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], EntrenadorController.prototype, "buscarPaginaEquipo", null);
__decorate([
    common_1.Get('crearPaginaEntrenador'),
    __param(0, common_1.Res()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EntrenadorController.prototype, "crearPaginaEquipo", null);
__decorate([
    common_1.Post('crearEntrenador'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], EntrenadorController.prototype, "crearEquipoPost", null);
__decorate([
    common_1.Post('eliminarEntrenador'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], EntrenadorController.prototype, "eliminarEquipoDelete", null);
EntrenadorController = __decorate([
    common_1.Controller('/api/entrenador'),
    __metadata("design:paramtypes", [entrenador_service_1.EntrenadorService])
], EntrenadorController);
exports.EntrenadorController = EntrenadorController;
//# sourceMappingURL=entrenador.controller.js.map