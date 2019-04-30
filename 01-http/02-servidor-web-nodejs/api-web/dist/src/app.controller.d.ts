import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    helloWorld(): string;
    holaMundo(): string;
    salutMonde(): string;
    ciaoMondo(): string;
    adivina(headers: any): string;
    consultar(queryParams: any): string;
    ciudad(parametrosRuta: any): "Que fueef" | "Que maah oe" | "Buenas tardes";
    registroComida(parametrosCuerpo: any, response: any): any;
    semilla(request: any): "OK" | "No";
    inicio(res: any): any;
}
