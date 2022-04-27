import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QueueNameConstant } from '../../constants/queue.constant';
import { Queue } from 'bull';
import { UserQueueProcess } from './queue-process-name';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QueueNameConstant.USER) private readonly userQueue: Queue,
  ) {}

  async handleAction(data) {
    await this.userQueue.add(UserQueueProcess.GET_USERS, data, {
      attempts: 5,
    });
  }
}
