import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shared/setup-swagger';
import { Logger } from 'nestjs-pino';
import { middleware as expressCtx } from 'express-ctx';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { ConfigConstant } from './constants';
import { getBoolean, getNumber } from './shared/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  app.use(expressCtx);
  app.use(compression());

  // logger
  app.useLogger(app.get(Logger));

  // cors
  app.enableCors(configService.get(ConfigConstant.CORS));

  // document
  if (getBoolean(process.env.ENABLE_DOCUMENTATION)) {
    setupSwagger(app);
  }

  const port = getNumber(process.env.PORT);
  await app.listen(port);

  console.info(`Server is running on: http://localhost:${port}`);
  return app;
}
void bootstrap();
