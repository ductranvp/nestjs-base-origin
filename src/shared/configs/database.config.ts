import { UserSubscriber } from '../entity-subscribers';
import { getNumber, SnakeNamingStrategy } from '../utils';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { ConfigConstant, NodeEnvConstant } from '../../constants';

export default registerAs(ConfigConstant.DATABASE, (): TypeOrmModuleOptions => {
  const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
  const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

  return {
    entities,
    migrations,
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: getNumber(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    keepConnectionAlive: true,
    subscribers: [UserSubscriber],
    migrationsRun: true,
    synchronize: process.env.NODE_ENV === NodeEnvConstant.DEVELOPMENT,
    logging: 'all',
    namingStrategy: new SnakeNamingStrategy(),
  };
});
