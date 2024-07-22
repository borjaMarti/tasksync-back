import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksGateway } from './tasks.gateway';
import { PrismaService } from 'src/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
