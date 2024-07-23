import { Injectable } from '@nestjs/common';
import { EmailRepository } from './email.repository';

@Injectable()
export class EmailService {
  constructor(private repository: EmailRepository) {}

  async sendTaskCreatedEmail(task: { title: string; priority: string }) {
    const mail = {
      from: '"TaskSync" <notifications@tasksync.com>',
      to: 'me@tasksync.com',
      subject: 'New Task Created',
      text: `New task created: ${task.title}. Priority: ${task.priority}`,
      html: `<p>New task created: ${task.title}. Priority: ${task.priority}</p>`,
    };

    await this.repository.sendTaskCreatedEmail(mail);
  }
}
