import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import EmailRepositoryInterface from './email.repository.interface';

@Injectable()
export class EmailRepository implements EmailRepositoryInterface {
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

  async sendTaskCreatedEmail(mail: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  }) {
    await this.transporter.sendMail(mail);
  }
}
