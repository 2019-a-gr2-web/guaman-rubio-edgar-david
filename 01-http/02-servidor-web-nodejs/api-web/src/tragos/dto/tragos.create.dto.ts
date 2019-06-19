import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class TragosCreateDto {

    @IsEmpty()
    id:number

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;

    @IsNotEmpty()
    @IsNumber()
    gradosAlcohol: number;

    @IsDate()//La validacion de existe o no ya lo hace por defecto
    @IsOptional()
    fechaCaducidad: Date;

    @IsNumber()
    precio:number;

    @IsNumber()
    @IsOptional()
    distribuidorId: number;

}