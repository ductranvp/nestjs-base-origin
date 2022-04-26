import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './shared/services/app-config.service';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { Params } from 'nestjs-pino/params';

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
      useFactory: async (configService: AppConfigService): Promise<Params> => {
        return configService.getLogConfig(configService);
      },
    }),

    UserModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
