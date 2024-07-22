import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma.service';
import { TasksGateway } from './tasks.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService, TasksGateway],
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [String(process.env.RABBITMQ_URL)],
          queue: 'email_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class TasksModule {}
