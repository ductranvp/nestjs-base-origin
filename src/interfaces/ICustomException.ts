'use strict';

export interface ICustomException {
  key: string; // i18n key
  statusCode: number;
  timestamp?: Date;
}
