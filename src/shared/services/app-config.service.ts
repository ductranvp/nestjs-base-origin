import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { SnakeNamingStrategy } from '../../snake-naming.strategy';
import { EnvVariableConstant } from '../../constants/env-variable.constant';
import { NodeEnvConstant } from '../../constants/node-env.constant';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Params } from 'nestjs-pino/params';
import { LogLevelConstant } from '../../constants/log-level.constant';
import { Options } from 'pino-http';
import { QueueOptions } from 'bull';
import { IAwsConfig } from '../../interfaces/IAwsConfig';
import { I18nOptions } from 'nestjs-i18n/dist/interfaces/i18n-options.interface';
import * as path from 'path';
import { LanguageConstant } from '../../constants/language.constant';
import { AcceptLanguageResolver, QueryResolver } from 'nestjs-i18n';

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

  get nodeEnv(): string {
    return this.getString(EnvVariableConstant.NODE_ENV);
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: this.get(EnvVariableConstant.DB_TYPE) as any,
      host: this.get(EnvVariableConstant.DB_HOST),
      port: this.getNumber(EnvVariableConstant.DB_PORT),
      username: this.get(EnvVariableConstant.DB_USERNAME),
      password: this.get(EnvVariableConstant.DB_PASSWORD),
      database: this.get(EnvVariableConstant.DB_DATABASE),
      subscribers: [],
      migrationsRun: true,
      synchronize: true,
      logging: 'all',
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  get corsConfig(): CorsOptions {
    const allowedOrigins = this.getString(
      EnvVariableConstant.ALLOWED_ORIGINS,
    ).split(';');
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
      port: this.getString(EnvVariableConstant.PORT),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }

  get documentationEnabled(): boolean {
    return this.getBoolean(EnvVariableConstant.ENABLE_DOCUMENTATION);
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
        host: this.getString(EnvVariableConstant.QUEUE_HOST),
        port: this.getNumber(EnvVariableConstant.QUEUE_PORT),
      },
    };
  }

  get awsS3Config(): IAwsConfig {
    return {
      apiEndpoint: this.get(EnvVariableConstant.S3_ENDPOINT),
      credentials: {
        accessKeyId: this.get(EnvVariableConstant.S3_ACCESS_KEY),
        secretAccessKey: this.get(EnvVariableConstant.S3_SECRET_KEY),
      },
      bucketName: this.get(EnvVariableConstant.S3_BUCKET_NAME),
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
}
