import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';

import { SnakeNamingStrategy } from '../../snake-naming.strategy';
import { EnvVariableConstant } from '../../constants/env-variable.constant';
import { NodeEnvConstant } from '../../constants/node-env.constant';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

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
}
