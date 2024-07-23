import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailRepository } from './email.repository';

@Module({
  controllers: [EmailController],
  providers: [EmailRepository, EmailService],
})
export class EmailModule {}
