import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

const nodeEnv = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${nodeEnv}`,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
