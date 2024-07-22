import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Task, Prisma } from '@prisma/client';
import { TasksGateway } from './tasks.gateway';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private tasksGateway: TasksGateway,
    @Inject('EMAIL_SERVICE') private client: ClientProxy,
  ) {}

  async findAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    const task = await this.prisma.task.create({
      data,
    });
    this.tasksGateway.sendEvent('tasksUpdated');
    this.client.emit('taskCreated', task);
    return task;
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { where, data } = params;
    const task = await this.prisma.task.update({
      data,
      where,
    });
    this.tasksGateway.sendEvent('tasksUpdated');
    return task;
  }

  async removeTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    const task = await this.prisma.task.delete({
      where,
    });
    this.tasksGateway.sendEvent('tasksUpdated');
    return task;
  }
}
