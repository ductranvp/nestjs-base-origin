'use strict';

export interface ICustomException {
  key: string; // i18n key
  statusCode: number;
  timestamp?: Date;
}

export class CustomException extends Error {
  error: ICustomException;
  constructor(error: ICustomException) {
    super();
    this.error = error;
  }
}
