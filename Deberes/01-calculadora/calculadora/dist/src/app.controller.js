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
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    sumar(headers, request, response) {
        const num1 = Number(headers.numero1);
        const num2 = Number(headers.numero2);
        if (headers.numero1 == null || headers.numero2 == null) {
            return response.send('Error en los argumentos de la suma');
        }
        else {
            const cookie = request.cookies;
            const suma_total = num1 + num2;
            response.cookie('Usuario', 'Edgar');
            return response.send({ 'El resultado es:': suma_total.toString(), 'Usuario:': cookie.Usuario });
        }
    }
    restar(parametrosCuerpo, request, response) {
        const num1 = Number(parametrosCuerpo.numero1);
        const num2 = Number(parametrosCuerpo.numero2);
        if (parametrosCuerpo.numero1 == null || parametrosCuerpo.numero2 == null) {
            return response.send('Error en los argumentos de la suma');
        }
        else {
            const cookie = request.cookies;
            const resta_total = num1 - num2;
            response.cookie('Usuario', 'Edgar');
            return response.send({ 'El resultado es:': resta_total.toString(), 'Usuario:': cookie.Usuario });
        }
    }
    multiplicar(queryParams, request, response) {
        const multiplicando = Number(queryParams.numero1);
        const multiplicador = Number(queryParams.numero2);
        if (queryParams.numero1 == null || queryParams.numero2 == null) {
            return response.status(400).send({ mensaje: 'Error en los parámetros de la multiplicación', error: 400 });
        }
        else {
            const cookie = request.cookies;
            const producto = multiplicando * multiplicador;
            response.cookie('Usuario', 'Edgar');
            return response.send({ 'El resultado es:': producto.toString(), 'Usuario:': cookie.Usuario });
        }
    }
    dividir(queryParams, parametrosCuerpo, headers, response, request) {
        if (queryParams.numero1 == null && parametrosCuerpo.numero1 != null && headers.numero1 != null) {
            const cookie = request.cookies;
            response.cookie('Usuario', 'Edgar');
            const dividendo = Number(parametrosCuerpo.numero1);
            const divisor = Number(headers.numero1);
            const cociente = dividendo / divisor;
            return response.send({ 'El resultado es:': cociente.toString(), 'Usuario:': cookie.Usuario });
        }
        else if (parametrosCuerpo.numero1 == null && queryParams.numero1 != null && headers.numero1 != null) {
            const cookie = request.cookies;
            response.cookie('Usuario', 'Edgar');
            const dividendo = Number(queryParams.numero1);
            const divisor = Number(headers.numero1);
            const cociente = dividendo / divisor;
            return response.send({ 'El resultado es:': cociente.toString(), 'Usuario:': cookie.Usuario });
        }
        else if (headers.numero1 == null && queryParams.numero1 != null && parametrosCuerpo.numero1 != null) {
            const cookie = request.cookies;
            response.cookie('Usuario', 'Edgar');
            const dividendo = Number(queryParams.numero1);
            const divisor = Number(parametrosCuerpo.numero1);
            const cociente = dividendo / divisor;
            return response.send({ 'El resultado es:': cociente.toString(), 'Usuario:': cookie.Usuario });
        }
        else {
            return response.status(400).send({ mensaje: 'Error en los parámetros de la division', error: 400 });
        }
    }
};
__decorate([
    common_1.Get('/sumar'),
    common_1.HttpCode(200),
    __param(0, common_1.Headers()), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sumar", null);
__decorate([
    common_1.Post('/restar'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "restar", null);
__decorate([
    common_1.Put('/multiplicar'),
    common_1.HttpCode(202),
    __param(0, common_1.Query()), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "multiplicar", null);
__decorate([
    common_1.Delete('/dividir'),
    common_1.HttpCode(203),
    __param(0, common_1.Query()), __param(1, common_1.Body()), __param(2, common_1.Headers()), __param(3, common_1.Response()), __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "dividir", null);
AppController = __decorate([
    common_1.Controller('/calculadora'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map