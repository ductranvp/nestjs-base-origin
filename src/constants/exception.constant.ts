'use strict';

import { HttpStatus } from '@nestjs/common';

export const ExceptionConstant = {
  NOT_FOUND: {
    key: 'error.notFound',
    statusCode: HttpStatus.NOT_FOUND,
  },
  BAD_REQUEST: {
    key: 'error.badRequest',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  UPLOAD_FAILED: {
    key: 'error.uploadFile',
    statusCode: HttpStatus.NOT_ACCEPTABLE,
  },
};
