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
import { Task as TaskModel } from '@prisma/client';
import { Priority } from './tasks.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body() taskData: { title: string; priority: Priority },
  ): Promise<TaskModel> {
    if (!Object.values(Priority).includes(taskData.priority)) {
      throw new BadRequestException(
        `Invalid priority value: ${taskData.priority}`,
        { cause: new Error(), description: `Priority should be a valid value` },
      );
    }
    return this.tasksService.createTask(taskData);
  }

  @Get()
  async findAllTasks(): Promise<TaskModel[]> {
    return this.tasksService.findAllTasks();
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: { title?: string; priority?: Priority },
  ): Promise<TaskModel> {
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
      where: { id: id },
      data: taskData,
    });
  }

  @Delete(':id')
  async removeTask(@Param('id') id: string): Promise<TaskModel> {
    return this.tasksService.removeTask({ id });
  }
}
