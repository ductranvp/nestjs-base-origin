import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { DoneCallback, Job } from 'bull';
import { QueueNameConstant } from '../../../constants/queue.constant';
import { UserQueueProcess } from '../queue-process-name';

@Processor(QueueNameConstant.USER)
export class UserProcessor {
  private readonly logger = new Logger(UserProcessor.name);

  @Process(UserQueueProcess.GET_USERS)
  async progress(job: Job, cb: DoneCallback) {
    try {
      const data = job.data;
      this.logger.log(data);
      cb(null);
    } catch (e) {
      this.logger.error(e);
      cb(e);
    }
  }
}
