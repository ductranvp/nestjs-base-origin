import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { DoneCallback, Job } from 'bull';
import { QueueNameConstant } from '../../../constants/queue.constant';

@Processor(QueueNameConstant.USER)
@Injectable()
export class UserProcessor {
  private readonly logger = new Logger(UserProcessor.name);

  @Process({ concurrency: 5 })
  async progress(job: Job, cb: DoneCallback) {
    try {
      const data = job.data;
      this.logger.log('User processor', data);
      cb(null);
    } catch (e) {
      this.logger.error(e);
      cb(e);
    }
  }
}
