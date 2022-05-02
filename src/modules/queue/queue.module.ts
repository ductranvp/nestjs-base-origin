import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueNameConstant } from '../../constants';
import { QueueService } from './queue.service';
import { UserProcessor } from './processor/user.processor';
import { QueueUiService } from './queue-ui.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueNameConstant.USER,
    }),
  ],
  providers: [QueueService, QueueUiService, UserProcessor],
  exports: [QueueService, QueueUiService],
})
export class QueueModule {}
