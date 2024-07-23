import { Inject, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { TasksGateway } from './tasks.gateway';
import { ClientProxy } from '@nestjs/microservices';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private repository: TasksRepository,
    private tasksGateway: TasksGateway,
    @Inject('EMAIL_SERVICE') private client: ClientProxy,
  ) {}

  async findAllTasks(): Promise<Task[]> {
    const tasks = await this.repository.getTasks();
    return tasks;
  }

  async createTask(params: {
    title: Task['title'];
    priority: Task['priority'];
  }): Promise<Task> {
    const { title, priority } = params;
    const task = await this.repository.createTask({
      title,
      priority,
    });
    this.tasksGateway.sendEvent('tasksUpdated');
    this.client.emit('taskCreated', task);
    return task;
  }

  async updateTask(params: {
    id: Task['id'];
    data: {
      title?: Task['title'];
      priority?: Task['priority'];
    };
  }): Promise<Task> {
    const { id, data } = params;
    const task = await this.repository.updateTask({
      id: { id },
      data,
    });
    this.tasksGateway.sendEvent('tasksUpdated');
    return task;
  }

  async deleteTask(id: Task['id']): Promise<Task> {
    const task = await this.repository.deleteTask({
      id,
    });
    this.tasksGateway.sendEvent('tasksUpdated');
    return task;
  }
}
