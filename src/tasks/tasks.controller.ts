import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { Priority } from './tasks.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body() taskData: { title: string; priority: Priority },
  ): Promise<Task> {
    if (!Object.values(Priority).includes(taskData.priority)) {
      throw new BadRequestException(
        `Invalid priority value: ${taskData.priority}`,
        { cause: new Error(), description: `Priority should be a valid value` },
      );
    }
    return this.tasksService.createTask(taskData);
  }

  @Get()
  async findAllTasks(): Promise<Task[]> {
    return this.tasksService.findAllTasks();
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: { title?: string; priority?: Priority },
  ): Promise<Task> {
    if (
      taskData.priority &&
      !Object.values(Priority).includes(taskData.priority)
    ) {
      throw new BadRequestException(
        `Invalid priority value: ${taskData.priority}`,
        { cause: new Error(), description: `Priority should be a valid value` },
      );
    }
    return this.tasksService.updateTask({
      id,
      data: taskData,
    });
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }
}
