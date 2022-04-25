import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvVariableConstants } from './constants/env-variable.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get(EnvVariableConstants.BACKEND_PORT);
  await app.listen(port);
}
bootstrap();
