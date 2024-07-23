import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksGateway } from './tasks.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TasksRepository } from './tasks.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [TasksController],
  providers: [TasksRepository, TasksService, TasksGateway],
  imports: [
    PrismaModule,
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
