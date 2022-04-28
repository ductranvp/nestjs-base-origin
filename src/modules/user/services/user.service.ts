import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { QueueService } from '../../queue/queue.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private queueService: QueueService,
    private i18nService: I18nService,
  ) {}

  getUsers(lang: string) {
    this.queueService.handleAction('Call user queue');
    return this.i18nService.t('error.notFound', {
      lang: lang,
    });
  }

  getUser(id: string) {
    return `Get user with id: ${id}`;
  }
}
