import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendTaskCreatedEmail(task: { title: string; priority: string }) {
    const mail = {
      from: '"TaskSync" <notifications@tasksync.com>',
      to: 'me@tasksync.com',
      subject: 'New Task Created',
      text: `New task created: ${task.title}. Priority: ${task.priority}`,
      html: `<p>New task created: ${task.title}. Priority: ${task.priority}</p>`,
    };

    await this.transporter.sendMail(mail);
  }
}
