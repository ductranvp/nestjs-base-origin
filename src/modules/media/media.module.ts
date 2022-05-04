import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaRepository } from './media.repository';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MediaRepository])],
  controllers: [MediaController],
  exports: [MediaService],
  providers: [MediaService],
})
export class MediaModule {}
