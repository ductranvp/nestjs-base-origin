import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { QueueNameConstant } from '../../../constants';

@Injectable()
export class QueueUiService {
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
}
