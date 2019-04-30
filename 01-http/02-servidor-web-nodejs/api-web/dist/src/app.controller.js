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
const Joi = require("@hapi/joi");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    helloWorld() {
        return 'hello world';
    }
    holaMundo() {
        return 'Hola mundo en post';
    }
    salutMonde() {
        return 'salut monde en put';
    }
    ciaoMondo() {
        return 'ciao mondo en delete';
    }
    adivina(headers) {
        console.log('Headers:', headers);
        const numeroRandomico = Math.round(Math.random() * 10);
        const numeroDeCabecera = Number(headers.numero);
        if (numeroDeCabecera == numeroRandomico) {
            return 'OK';
        }
        else {
            return 'No mijo';
        }
    }
    consultar(queryParams) {
        console.log(queryParams);
        if (queryParams.nombre) {
            return `Hola ${queryParams.nombre}`;
        }
        else {
            return 'Hola desconocido';
        }
    }
    ciudad(parametrosRuta) {
        switch (parametrosRuta.idCiudad.toLowerCase()) {
            case 'quito':
                return 'Que fueef';
            case 'guayaqui':
                return 'Que maah oe';
            default:
                return 'Buenas tardes';
        }
    }
    registroComida(parametrosCuerpo, response) {
        if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad) {
            const cantidad = Number(parametrosCuerpo.cantidad);
            if (cantidad > 1) {
                response.set('Premio', 'Fanesca');
            }
            return response.send({ mensaje: "Registro creado" });
        }
        else {
            return response.status(400).send({ mensaje: "ERROR, no envia nombre o cantidad", error: 400 });
        }
    }
    semilla(request, response) {
        console.log(request.cookies);
        const cookies = request.cookies;
        const esquemaValidacionNumero = Joi
            .object()
            .keys({
            numero: Joi.number().integer().required()
        });
        const objetoValidacion = {
            numero: cookies.numero
        };
        const resultado = Joi.validate(objetoValidacion, esquemaValidacionNumero);
        if (resultado.error) {
            console.log('Resultado: ', resultado);
        }
        else {
            console.log('Numero valido');
        }
        const cookieSegura = request.signedCookies.fechaServidor;
        if (cookieSegura) {
            console.log('Cookie segura', cookieSegura);
        }
        else {
            console.log('No es valida esta cookie');
        }
        if (cookies.micookie) {
            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos + 1);
            response.cookie('fechaServidor', new Date().getTime(), {
                signed: true
            });
            return response.send('ok');
        }
        else {
            return response.send(':(');
        }
    }
    inicio(res) {
        return res.render('inicio');
    }
};
__decorate([
    common_1.Get('/hello-world'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "helloWorld", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/hola-mundo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaMundo", null);
__decorate([
    common_1.Put('/salut-monde'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "salutMonde", null);
__decorate([
    common_1.Delete('/ciao-mondo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "ciaoMondo", null);
__decorate([
    common_1.Get('/adivina'),
    __param(0, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "adivina", null);
__decorate([
    common_1.Get('/consultar'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "consultar", null);
__decorate([
    common_1.Get('/ciudad/:idCiudad'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "ciudad", null);
__decorate([
    common_1.Post('/registroComida'),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "registroComida", null);
__decorate([
    common_1.Get('/semilla'),
    __param(0, common_1.Request()),
    __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "semilla", null);
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "inicio", null);
AppController = __decorate([
    common_1.Controller('/api'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
const arreglo = [function () { return '0'; }, 1, true, null];
const arregloNumerosForEach = [1, 2, 3, 4, 5, 6];
const respuestaForEach = arregloNumerosForEach.forEach(function (valorActual) {
    console.log(`Valor: ${valorActual}`);
});
console.log(`Respuesta ForEach: ${respuestaForEach}`);
const arregloNumerosMap = [1, 2, 3, 4, 5, 6];
const rMap = arregloNumerosMap.map((valorActual) => {
    const esPar = valorActual % 2 == 0;
    if (esPar) {
        const nuevoValor = valorActual + 2;
        return nuevoValor;
    }
    else {
        const nuevoValor = valorActual + 1;
        return nuevoValor;
    }
});
console.log(`Respuesta MAP: ${rMap}`);
const arregloNumerosFind = [1, 2, 3, 4, 5, 6];
const rFind = arregloNumerosFind.find((valorActual) => { return valorActual == 4; });
console.log(`Respuesta Find: ${rFind}`);
const arregloNumerosFilter = [1, 2, 3, 4, 5, 6];
const rFilter = arregloNumerosFilter.filter((valorActual) => { return valorActual < 5; });
console.log(`Respuesta Filter: ${rFilter}`);
const arregloNumerosEvery = [1, 2, 3, 4, 5, 6];
const rEvery = arregloNumerosEvery.every((valorActual) => { return valorActual > 0; });
console.log(`Respuesta Every: ${rEvery}`);
const arregloNumerosSome = [1, 2, 3, 4, 5, 6];
const rSome = arregloNumerosEvery.some((valorActual) => { return valorActual < 2; });
console.log(`Respuesta Some: ${rSome}`);
const arregloNumerosReduce = [1, 2, -3, 4, -5, 6];
const valorEmpiezaCalculo = 0;
const rReduce = arregloNumerosReduce.reduce((acumulado, valorActual) => { return acumulado + valorActual; }, valorEmpiezaCalculo);
console.log(`Respuesta Reduce: ${rReduce}`);
const arregloNumerosPorcentaje = [1, 2, 3, 4, 5, 6];
const valorEmpieza = 0;
const resReduce = arregloNumerosPorcentaje.reduce((acumulado, valorActual) => {
    if (valorActual < 4) {
        return acumulado + valorActual * 1.1 + 5;
    }
    else {
        return acumulado + valorActual * 1.15 + 3;
    }
    return acumulado + valorActual;
}, valorEmpieza);
console.log(`Respuesta aumento: ${resReduce}`);
const arregloNumerosResta = [1, 2, 3, 4, 5, 6];
const valorComienza = 100;
const respuesta = arregloNumerosResta.reduce((acumulado, valorActual) => {
    return acumulado - valorActual;
}, valorComienza);
console.log(`Respuesta aumento: ${respuesta}`);
const arregloEjercicio = [1, 2, 3, 4, 5, 6];
const resultado = arregloEjercicio.map((valorActual) => { return valorActual + 10; })
    .filter((valorActual => { return valorActual > 15; })).some((valorActual) => { return valorActual > 30; });
console.log(`Respuesta ejercicio: ${resultado}`);
//# sourceMappingURL=app.controller.js.map