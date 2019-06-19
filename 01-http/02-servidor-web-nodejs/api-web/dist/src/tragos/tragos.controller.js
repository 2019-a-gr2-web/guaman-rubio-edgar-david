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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tragos_service_1 = require("./tragos.service");
const tragos_create_dto_1 = require("./dto/tragos.create.dto");
const class_validator_1 = require("class-validator");
let TragosController = class TragosController {
    constructor(_tragosService) {
        this._tragosService = _tragosService;
    }
    listarTragos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const arregloTragos = yield this._tragosService.buscar();
            res.render('tragos/lista-tragos', { arregloTragos: arregloTragos });
        });
    }
    crearTrago(res, mensaje) {
        res.render('tragos/crear-listar', { mensaje: mensaje });
    }
    crearTragoPost(trago, res) {
        return __awaiter(this, void 0, void 0, function* () {
            trago.gradosAlcohol = Number(trago.gradosAlcohol);
            trago.precio = Number(trago.precio);
            trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;
            console.log(trago);
            let tragoAValidar = new tragos_create_dto_1.TragosCreateDto();
            tragoAValidar.nombre = trago.nombre;
            tragoAValidar.tipo = trago.tipo;
            tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
            tragoAValidar.precio = trago.precio;
            tragoAValidar.gradosAlcohol = trago.gradosAlcohol;
            try {
                const errores = yield class_validator_1.validate(tragoAValidar);
                if (errores.length > 0) {
                    console.log(errores);
                    res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario');
                }
                else {
                    const respuestaCrear = yield this._tragosService.crear(trago);
                    console.log('Respuesta: ', respuestaCrear);
                    res.redirect('/api/traguito/lista');
                }
            }
            catch (e) {
                res.status(500);
                res.send({ mensaje: 'Error', codigo: 500 });
            }
            this._tragosService.crear(trago);
            res.redirect('/api/traguito/lista');
        });
    }
    eliminarTrago(id, res) {
        this._tragosService.eliminarPorId(id);
        res.redirect('/api/traguito/lista');
    }
};
__decorate([
    common_1.Get('lista'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TragosController.prototype, "listarTragos", null);
__decorate([
    common_1.Get('crear'),
    __param(0, common_1.Response()), __param(1, common_1.Query('mensaje')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TragosController.prototype, "crearTrago", null);
__decorate([
    common_1.Post('crear'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TragosController.prototype, "crearTragoPost", null);
__decorate([
    common_1.Post('eliminar'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TragosController.prototype, "eliminarTrago", null);
TragosController = __decorate([
    common_1.Controller('/api/traguito'),
    __metadata("design:paramtypes", [tragos_service_1.TragosService])
], TragosController);
exports.TragosController = TragosController;
//# sourceMappingURL=tragos.controller.js.map