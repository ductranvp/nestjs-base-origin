import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueNameConstant } from '../../constants';
import { QueueService } from './queue.service';
import { UserProcessor } from './processors/user.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueNameConstant.USER,
    }),
  ],
  providers: [QueueService, UserProcessor],
  exports: [QueueService],
})
export class QueueModule {}
