import {
  ConfigConstant,
  LogLevelConstant,
  NodeEnvConstant,
} from '../constants';
import { Options } from 'pino-http';
import { Params } from 'nestjs-pino/params';
import { registerAs } from '@nestjs/config';

export default registerAs(ConfigConstant.LOGGER, (): Params => {
  const optionsLogger: Options = {
    timestamp: true,
    level: LogLevelConstant.warn,
  };

  if (process.env.NODE_ENV === NodeEnvConstant.DEVELOPMENT) {
    optionsLogger.prettyPrint = {
      colorize: true,
      levelFirst: true,
      translateTime: 'dd/mm/yyyy, HH:MM:ss TT Z',
    };
    optionsLogger.transport = {
      target: 'pino-pretty',
    };
    optionsLogger.level = LogLevelConstant.trace;
  }
  return {
    pinoHttp: {
      ...optionsLogger,
      customLogLevel: (res, err) => {
        if (res.statusCode >= 400 && res.statusCode < 500) {
          return LogLevelConstant.warn;
        } else if (res.statusCode >= 500 || err) {
          return LogLevelConstant.error;
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
          return LogLevelConstant.silent;
        }
        return LogLevelConstant.info;
      },
    },
  };
});
