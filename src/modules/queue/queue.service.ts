import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QueueNameConstant } from '../../constants/queue.constant';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue(QueueNameConstant.USER) private userQueue: Queue) {}

  async handleAction(data) {
    await this.userQueue.add(data, {
      attempts: 5,
    });
  }
}
