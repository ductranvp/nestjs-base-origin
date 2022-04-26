import { HttpStatus } from '@nestjs/common';

export const CustomExceptionConstant = {
  NOT_FOUND: {
    key: 'error.notFound',
    statusCode: HttpStatus.NOT_FOUND,
  },
  BAD_REQUEST: {
    key: 'error.badRequest',
    statusCode: HttpStatus.BAD_REQUEST,
  },
};
