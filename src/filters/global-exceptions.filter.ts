import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CustomException } from '../exceptions/custom.exception';
import { HttpAdapterHost } from '@nestjs/core';

const logger = new Logger('GlobalExceptionsFilter');

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

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
