import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './shared/services/app-config.service';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './modules/queue/queue.module';
import { MediaModule } from './modules/media/media.module';
import { I18nModule } from 'nestjs-i18n';
import { AllExceptionsFilter } from './filters';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: AppConfigService) =>
        configService.typeOrmConfig,
      inject: [AppConfigService],
    }),
    LoggerModule.forRootAsync({
      imports: [SharedModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) =>
        configService.loggerConfig,
    }),
    BullModule.forRootAsync({
      imports: [SharedModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) =>
        configService.queueConfig,
    }),
    I18nModule.forRootAsync({
      imports: [SharedModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) =>
        configService.getLanguageConfig,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    QueueModule,
    MediaModule,
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
