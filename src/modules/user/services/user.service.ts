import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { QueueService } from '../../queue/queue.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private queueService: QueueService,
  ) {}

  async getUsers() {
    await this.queueService.handleAction('Call user queue');
    return 'Get all users';
  }

  getUser(id: string) {
    return `Get user with id: ${id}`;
  }
}
