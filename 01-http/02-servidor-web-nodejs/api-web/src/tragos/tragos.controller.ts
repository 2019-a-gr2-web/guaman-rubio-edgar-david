import {Controller, Get, Post, Response, Body, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";
import {type} from "os";

@Controller('/api/traguito')
export class TragosController {
    constructor(private readonly _tragosService:TragosService){

    }

@Get('lista')
async listarTragos(@Response() res){
        const arregloTragos = await this._tragosService.buscar();
        /*const arregloTragos = this._tragosService.bddTragos;*/
        res.render('tragos/lista-tragos',{arregloTragos:arregloTragos})
    }

@Get('crear')
crearTrago(@Response() res){
     res.render('tragos/crear-listar')
}

@Post('crear')
async crearTragoPost(@Body() trago:Trago,@Res() res
               // @Body('nombre') nombre:string,
               // @Body('tipo') tipo:string,
               // @Body('gradosAlcohol') gradosAlcohol:number,
               // @Body('fechaCaducidad') fechaCaducidad:Date,
               // @Body('Precio') precio:number
){
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);
        console.log(trago);

        try {
            const respuestaCrear = await this._tragosService.crear(trago)
            console.log('Respuesta: ', respuestaCrear);
            res.redirect('/api/traguito/lista')
        }catch (e) {
            res.status(500);
            res.send({mensaje:'Error',codigo:500});

        }



        this._tragosService.crear(trago);
        res.redirect('/api/traguito/lista');
        // console.log('Trago: ',trago, typeof trago);
    // console.log('Nombre: ',trago, typeof nombre);
    // console.log('Tipo: ',trago, typeof tipo);
    // console.log('gradosAlcohol: ',trago,typeof gradosAlcohol);
    // console.log('Fecha de Caducidad: ',trago,typeof fechaCaducidad);
    // console.log('Precio: ',trago,typeof precio);
}

    @Post('eliminar')
    eliminarTrago(
        @Body() id:number,
        @Res() res
    ){
        this._tragosService.eliminarPorId(id);
        res.redirect('/api/traguito/lista');
    }

}