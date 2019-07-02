import {Controller, Get, Post, Response, Body, Res, Query, Param} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";
import {TragosCreateDto} from "./dto/tragos.create.dto";
import {validate} from "class-validator";

@Controller('/api/traguito')
export class TragosController {
    constructor(private readonly _tragosService: TragosService) {

    }

    @Get('lista')
    async listarTragos(@Response() res) {
        const arregloTragos = await this._tragosService.buscar();
        /*const arregloTragos = this._tragosService.bddTragos;*/
        res.render('tragos/lista-tragos', {arregloTragos: arregloTragos})
    }

    @Get('crear')
    crearTrago(@Response() res, @Query('mensaje') mensaje:string) {
        res.render(
            'tragos/crear-listar',
            {mensaje:mensaje})
    }

    @Post('crear')
    async crearTragoPost(@Body() trago: Trago, @Res() res
                         // @Body('nombre') nombre:string,
                         // @Body('tipo') tipo:string,
                         // @Body('gradosAlcohol') gradosAlcohol:number,
                         // @Body('fechaCaducidad') fechaCaducidad:Date,
                         // @Body('Precio') precio:number
    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;
        console.log(trago);

        let tragoAValidar = new TragosCreateDto();
        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;

        try {
            const errores = await validate(tragoAValidar);

            if (errores.length > 0) {
                console.log(errores)
                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario');
            } else {
                const respuestaCrear = await this._tragosService.crear(trago)
                console.log('Respuesta: ', respuestaCrear);
                res.redirect('/api/traguito/lista')
            }

        } catch (e) {
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
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
    async borrar(
        @Body('id') id: number,
        @Res() response
    ) {
        try {
            const tragoAbuscar = await this._tragosService.buscarPorId(+id);
            await this._tragosService.eliminarId(Number(id));
            response.redirect('/api/traguito/lista');
        }
        catch
            (e) {
            console.error(e);
            response.status(500);
            response.send({mensaje: 'Error', codigo: 500});
        }
    }

    @Get('editar/:id')
    async actualizarTrago(
        @Param('id') id: string,
        @Res() response,
        @Query('mensaje') mensaje:string
    ) {
        console.log(Number(id));
        const tragoAActualizar = await this._tragosService.buscarPorId(Number(id));
        console.log('trago', tragoAActualizar.nombre);

        return response.render(
            'tragos/crear-listar',
            {mensaje: mensaje,trago: tragoAActualizar})
    }

    @Post('actualizar-trago/:id')
    async actualizarTragoForm(
        @Param('id') id: string,
        @Res() response,
        @Body() trago: Trago
    ) {
        trago.id = +id;
        await this._tragosService.actualizar(+id, trago);
        response.redirect('/api/traguito/lista');
    }


    /*@Post('eliminar')
    eliminarTrago(
        @Body() id: number,
        @Res() res
    ) {
        this._tragosService.eliminarPorId(id);
        res.redirect('/api/traguito/lista');
    }*/
}