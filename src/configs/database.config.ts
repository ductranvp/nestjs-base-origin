import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { ConfigConstant } from '../constants';
import { SnakeNamingStrategy } from './snake-naming.strategy';

export default registerAs(ConfigConstant.DATABASE, (): TypeOrmModuleOptions => {
  const entities = [__dirname + '/../modules/**/*.entity{.ts,.js}'];
  const subscribers = [__dirname + '/../modules/**/*.subscriber{.ts,.js}'];
  const migrations = [__dirname + '/../database/migrations/*{.ts,.js}'];

  return {
    entities,
    subscribers,
    migrations,
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    keepConnectionAlive: true,
    migrationsRun: true,
    synchronize: false,
    logging: 'all',
    namingStrategy: new SnakeNamingStrategy(),
  };
});
