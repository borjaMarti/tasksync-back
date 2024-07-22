import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from 'src/email/email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('taskCreated')
  async handleTaskCreated(
    @Payload() task: { title: string; priority: string },
  ): Promise<void> {
    await this.emailService.sendTaskCreatedEmail(task);
  }
}
