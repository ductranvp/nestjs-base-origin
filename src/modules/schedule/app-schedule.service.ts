import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '../queue/services/queue.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppScheduleService {
  private readonly logger = new Logger(AppScheduleService.name);

  constructor(private queueService: QueueService) {}

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
    this.queueService.doSomething('Do something');
  }
}
