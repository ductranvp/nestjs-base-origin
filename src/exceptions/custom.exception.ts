'use strict';

import { ICustomException } from '../interfaces';

export class CustomException extends Error {
  error: ICustomException;
  constructor(error: ICustomException) {
    super();
    this.error = error;
  }
}
