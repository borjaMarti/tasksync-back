import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksGateway } from './tasks.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TasksRepository } from './tasks.repository';
import { PrismaService } from 'src/database/prisma.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, TasksRepository, TasksGateway, PrismaService],
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

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
