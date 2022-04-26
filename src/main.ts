import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvVariableConstants } from './constants/env-variable.constants';
import { corsConfig } from './config/cors.config';
import { NodeEnvConstants } from './constants/node-env.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS
  const env = configService.get(EnvVariableConstants.NODE_ENV);
  if (env === NodeEnvConstants.DEVELOPMENT) {
    app.enableCors();
  } else {
    app.enableCors(corsConfig);
  }

  const port = configService.get(EnvVariableConstants.BACKEND_PORT);
  await app.listen(port);
}
bootstrap();
