import { Module } from '@nestjs/common';
import { AppScheduleService } from './app-schedule.service';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [QueueModule],
  providers: [AppScheduleService],
})
export class AppScheduleModule {}
