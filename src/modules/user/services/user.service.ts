import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { QueueService } from '../../queue/services/queue.service';
import { Cron } from '@nestjs/schedule';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private userRepository: UserRepository,
    private queueService: QueueService,
  ) {}

  getUsers(query: any) {
    return this.userRepository.find();
  }

  getUser(id: string) {
    return this.userRepository.findOneOrFail({ id });
  }

  createUser(payload: UserEntity) {
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
