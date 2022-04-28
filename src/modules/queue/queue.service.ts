import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QueueNameConstant, QueueProcessConstant } from '../../constants';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QueueNameConstant.USER) private readonly userQueue: Queue,
  ) {}

  async handleAction(data) {
    await this.userQueue.add(QueueProcessConstant.GET_USERS, data, {
      attempts: 5,
    });
  }
}
