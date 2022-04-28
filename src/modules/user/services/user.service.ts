import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { QueueService } from '../../queue/queue.service';
import { I18nService } from 'nestjs-i18n';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

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

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
}
