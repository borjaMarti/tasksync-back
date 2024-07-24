import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { Priority } from '../tasks.interface';

export class UpdateTaskDto {
  @IsNotEmpty()
  @Length(2, 50)
  title: string;

  @IsNotEmpty()
  @IsEnum(Priority)
  priority: string;
}
