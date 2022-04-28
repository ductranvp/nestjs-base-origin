import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CustomException } from '../exceptions';
import { I18nService } from 'nestjs-i18n';

const logger = new Logger('AllExceptionsFilter');

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof CustomException) {
      exception.error.timestamp = new Date();
      response.status(exception.error.statusCode).json(exception.error);
    } else if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
    } else {
      logger.error(exception);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal Server Error',
      });
    }
  }
}
