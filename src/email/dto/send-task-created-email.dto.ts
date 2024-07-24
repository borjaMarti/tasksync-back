import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { Priority } from 'src/tasks/tasks.interface';

export class SendTaskCreatedEmailDto {
  @IsNotEmpty()
  @Length(2, 50)
  title: string;

  @IsNotEmpty()
  @IsEnum(Priority)
  priority: string;
}
