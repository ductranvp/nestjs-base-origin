import { getNumber } from '../common/utils';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { ConfigConstant, NodeEnvConstant } from '../constants';
import { SnakeNamingStrategy } from './snake-naming.strategy';

export default registerAs(ConfigConstant.DATABASE, (): TypeOrmModuleOptions => {
  const entities = ['dist/modules/**/*.entity{.ts,.js}'];
  const subscribers = ['dist/modules/**/*.subscriber{.ts,.js}'];
  const migrations = ['dist/database/**/*.migration{.ts,.js}'];

  return {
    entities,
    subscribers,
    migrations,
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: getNumber(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    keepConnectionAlive: true,
    migrationsRun: true,
    synchronize: process.env.NODE_ENV === NodeEnvConstant.DEVELOPMENT,
    logging: 'all',
    namingStrategy: new SnakeNamingStrategy(),
  };
});
