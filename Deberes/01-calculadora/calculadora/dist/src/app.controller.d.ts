import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    sumar(headers: any, request: any, response: any): any;
    restar(parametrosCuerpo: any, request: any, response: any): any;
    multiplicar(queryParams: any, request: any, response: any): any;
    dividir(queryParams: any, parametrosCuerpo: any, headers: any, response: any, request: any): any;
}
