import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QueueNameConstant, QueueProcessConstant } from '../../../constants';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

@Injectable()
export class QueueService {
  private router;
  private setQueues;
  constructor(
    @InjectQueue(QueueNameConstant.USER) private readonly userQueue: Queue,
  ) {
    const { router, setQueues } = createBullBoard([new BullAdapter(userQueue)]);
    this.router = router;
    this.setQueues = setQueues;
  }

  get getRouter() {
    return this.router;
  }

  async doSomething(data) {
    await this.userQueue.add(QueueProcessConstant.DO_SOMETHING, data, {
      attempts: 5,
    });
  }
}
