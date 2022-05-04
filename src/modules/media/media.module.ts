import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaRepository } from './repositories/media.repository';
import { MediaService } from './services/media.service';
import { MediaController } from './controllers/media.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MediaRepository])],
  controllers: [MediaController],
  exports: [MediaService],
  providers: [MediaService],
})
export class MediaModule {}
