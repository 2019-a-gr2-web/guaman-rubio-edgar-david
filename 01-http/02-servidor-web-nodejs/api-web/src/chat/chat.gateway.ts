import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server } from 'socket.io';

@WebSocketGateway(3001,{namespace:'/websockets'})
export class ChatGateway {
    @WebSocketServer() server;

    constructor(){
        console.log(this.server);
    }

    @SubscribeMessage('holaMundo')
    holaMundo(client: Client | any, data: any){
        console.log(data);
        console.log('Se hizo la petición')
        console.log(this.server)
        client.broadcast.emit('saludaron',data);
        return 'Hola ' + data.nombre;
    }
}











