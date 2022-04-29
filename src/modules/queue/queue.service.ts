import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QueueNameConstant, QueueProcessConstant } from '../../constants';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QueueNameConstant.USER) private readonly userQueue: Queue,
  ) {}

  async doSomething(data) {
    await this.userQueue.add(QueueProcessConstant.DO_SOMETHING, data, {
      attempts: 5,
    });
  }
}
