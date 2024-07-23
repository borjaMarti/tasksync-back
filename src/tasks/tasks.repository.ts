import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TasksRepository {
  constructor(private prisma: PrismaService) {}

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async updateTask(params: {
    id: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { id, data } = params;
    return this.prisma.task.update({
      where: id,
      data,
    });
  }

  async deleteTask(id: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return this.prisma.task.delete({
      where: id,
    });
  }
}
