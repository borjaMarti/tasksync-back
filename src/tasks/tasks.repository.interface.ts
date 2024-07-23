import { Prisma, Task } from '@prisma/client';

export default interface TasksRepositoryInterface {
  getTasks(): Promise<Task[]>;
  createTask(data: Prisma.TaskCreateInput): Promise<Task>;
  updateTask(params: {
    id: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task>;
  deleteTask(id: Prisma.TaskWhereUniqueInput): Promise<Task>;
}
