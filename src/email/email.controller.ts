import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from 'src/email/email.service';
import { SendTaskCreatedEmailDto } from './dto/send-task-created-email.dto';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('taskCreated')
  async handleTaskCreated(
    @Payload() sendTaskCreatedEmailDto: SendTaskCreatedEmailDto,
  ): Promise<void> {
    await this.emailService.sendTaskCreatedEmail(sendTaskCreatedEmailDto);
  }
}
