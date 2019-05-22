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
const tragos_service_1 = require("./tragos.service");
let TragosController = class TragosController {
    constructor(_tragosService) {
        this._tragosService = _tragosService;
    }
    listarTragos(res) {
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/lista-tragos', { arregloTragos: arregloTragos });
    }
    crearTrago(res) {
        res.render('tragos/crear-listar');
    }
    crearTragoPost(trago, res) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);
        console.log(trago);
        this._tragosService.crear(trago);
        res.redirect('/api/traguito/lista');
    }
    eliminar(trago) {
        trago.nombre;
    }
};
__decorate([
    common_1.Get('lista'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TragosController.prototype, "listarTragos", null);
__decorate([
    common_1.Get('crear'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TragosController.prototype, "crearTrago", null);
__decorate([
    common_1.Post('crear'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TragosController.prototype, "crearTragoPost", null);
__decorate([
    common_1.Post('eliminar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TragosController.prototype, "eliminar", null);
TragosController = __decorate([
    common_1.Controller('/api/traguito'),
    __metadata("design:paramtypes", [tragos_service_1.TragosService])
], TragosController);
exports.TragosController = TragosController;
//# sourceMappingURL=tragos.controller.js.map