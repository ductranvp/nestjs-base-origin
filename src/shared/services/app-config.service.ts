import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';

import { SnakeNamingStrategy } from '../../snake-naming.strategy';
import { EnvVariableConstants } from '../../constants/env-variable.constants';
import { NodeEnvConstants } from '../../constants/node-env.constants';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === NodeEnvConstants.DEVELOPMENT;
  }

  get isStaging(): boolean {
    return this.nodeEnv === NodeEnvConstants.STAGING;
  }

  get isProduction(): boolean {
    return this.nodeEnv === NodeEnvConstants.PRODUCTION;
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
    return this.getString(EnvVariableConstants.NODE_ENV);
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: this.get(EnvVariableConstants.DB_TYPE) as any,
      host: this.get(EnvVariableConstants.DB_HOST),
      port: this.getNumber(EnvVariableConstants.DB_PORT),
      username: this.get(EnvVariableConstants.DB_USERNAME),
      password: this.get(EnvVariableConstants.DB_PASSWORD),
      database: this.get(EnvVariableConstants.DB_DATABASE),
      subscribers: [],
      migrationsRun: true,
      synchronize: true,
      logging: 'all',
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  get corsConfig(): CorsOptions {
    const allowedOrigins = this.getString(
      EnvVariableConstants.ALLOWED_ORIGINS,
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
      port: this.getString(EnvVariableConstants.PORT),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
