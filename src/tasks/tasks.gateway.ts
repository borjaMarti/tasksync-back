import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  sendEvent(event: string) {
    this.server.emit(event);
  }
}
