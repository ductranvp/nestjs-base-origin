import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { QueueService } from '../../queue/services/queue.service';
import { Cron } from '@nestjs/schedule';
import { UserEntity } from '../entities/user.entity';
import { MediaEntity } from '../../media/entities/media.entity';
import { MediaService } from '../../media/services/media.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private userRepository: UserRepository,
    private queueService: QueueService,
    private mediaService: MediaService,
  ) {}

  get repo() {
    return this.userRepository;
  }

  getUsers(query: any) {
    return this.userRepository.find();
  }

  getUser(id: string) {
    return this.userRepository.findOneOrFail({ id });
  }

  @Transactional()
  async createUser(payload: UserEntity) {
    const media = new MediaEntity();
    media.url = 'test transaction';
    await this.mediaService.repo.save(media);
    const temp = true;
    if (temp) {
      throw new Error('test transaction');
    }
    return this.userRepository.save(payload);
  }

  async updateUser(id: string, payload: UserEntity) {
    const exist = await this.userRepository.findOneOrFail({ id });
    payload.id = exist.id;
    return this.userRepository.save(payload);
  }

  deleteUser(id: string) {
    return this.userRepository.delete({ id });
  }

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
    this.queueService.doSomething('Do something');
  }
}
