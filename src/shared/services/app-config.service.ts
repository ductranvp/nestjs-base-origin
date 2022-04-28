import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { SnakeNamingStrategy } from '../utils';
import {
  EnvConstant,
  LanguageConstant,
  LogLevelConstant,
  NodeEnvConstant,
} from '../../constants';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Params } from 'nestjs-pino/params';
import { Options } from 'pino-http';
import { QueueOptions } from 'bull';
import { IAwsConfig } from '../interfaces';
import { I18nOptions } from 'nestjs-i18n/dist/interfaces/i18n-options.interface';
import * as path from 'path';
import { AcceptLanguageResolver, QueryResolver } from 'nestjs-i18n';
import { UserSubscriber } from '../entity-subscribers';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === NodeEnvConstant.DEVELOPMENT;
  }

  get isStaging(): boolean {
    return this.nodeEnv === NodeEnvConstant.STAGING;
  }

  get isProduction(): boolean {
    return this.nodeEnv === NodeEnvConstant.PRODUCTION;
  }

  get nodeEnv(): string {
    return this.getString(EnvConstant.NODE_ENV);
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: this.get(EnvConstant.DB_TYPE) as any,
      host: this.get(EnvConstant.DB_HOST),
      port: this.getNumber(EnvConstant.DB_PORT),
      username: this.get(EnvConstant.DB_USERNAME),
      password: this.get(EnvConstant.DB_PASSWORD),
      database: this.get(EnvConstant.DB_DATABASE),
      subscribers: [UserSubscriber],
      migrationsRun: true,
      synchronize: true,
      logging: 'all',
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  get corsConfig(): CorsOptions {
    const allowedOrigins = this.getString(EnvConstant.ALLOWED_ORIGINS).split(
      ';',
    );
    return {
      origin: (origin, callback) => {
        if (
          !origin ||
          allowedOrigins.includes('*') ||
          allowedOrigins.includes(origin)
        ) {
          callback(null, true);
        } else {
          callback(new Error(`${origin} not permitted by CORS policy.`));
        }
      },
      credentials: true,
      preflightContinue: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    };
  }

  get appConfig() {
    return {
      port: this.getString(EnvConstant.PORT),
    };
  }

  get documentationEnabled(): boolean {
    return this.getBoolean(EnvConstant.ENABLE_DOCUMENTATION);
  }

  get loggerConfig(): Params {
    const optionsLogger: Options = {
      timestamp: true,
      level: LogLevelConstant.warn,
    };

    if (this.isDevelopment) {
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
  }

  get queueConfig(): QueueOptions {
    return {
      redis: {
        host: this.getString(EnvConstant.QUEUE_HOST),
        port: this.getNumber(EnvConstant.QUEUE_PORT),
      },
    };
  }

  get awsS3Config(): IAwsConfig {
    return {
      apiEndpoint: this.get(EnvConstant.S3_ENDPOINT),
      credentials: {
        accessKeyId: this.get(EnvConstant.S3_ACCESS_KEY),
        secretAccessKey: this.get(EnvConstant.S3_SECRET_KEY),
      },
      bucketName: this.get(EnvConstant.S3_BUCKET_NAME),
    };
  }

  get getLanguageConfig(): I18nOptions {
    return {
      fallbackLanguage: LanguageConstant.en,
      loaderOptions: {
        path: path.join(__dirname, '/../../i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    };
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
