import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from './modules/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './modules/queue/queue.module';
import { MediaModule } from './modules/media/media.module';
import { I18nModule } from 'nestjs-i18n';
import { AllExceptionsFilter } from './filters';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigConstant } from './constants';
import {
  awsS3Config,
  corsConfig,
  databaseConfig,
  languageConfig,
  loggerConfig,
  queueConfig,
} from './configs';
import { AppScheduleModule } from './modules/schedule/app-schedule.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [
        databaseConfig,
        corsConfig,
        languageConfig,
        loggerConfig,
        awsS3Config,
        queueConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(ConfigConstant.DATABASE),
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(ConfigConstant.LOGGER),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(ConfigConstant.QUEUE),
    }),
    I18nModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(ConfigConstant.LANGUAGE),
    }),
    ScheduleModule.forRoot(),
    UserModule,
    QueueModule,
    MediaModule,
    ScheduleModule,
    AppScheduleModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
