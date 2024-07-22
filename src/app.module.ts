import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { EmailModule } from './email/email.module';

// Borja: We use ConfigModule with the isGlobal true option so .env variables
// are available throughout the app without the need for imports.
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TasksModule, EmailModule],
})
export class AppModule {}
