import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configs';
import { Logger } from 'nestjs-pino';
import { middleware as expressCtx } from 'express-ctx';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { ConfigConstant } from './constants';
import { getBoolean, getNumber } from './common/utils';
import { QueueModule } from './modules/queue/queue.module';
import * as expressBasicAuth from 'express-basic-auth';
import { QueueService } from './modules/queue/services/queue.service';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

async function bootstrap() {
  // transactional decorator
  initializeTransactionalContext(); // Initialize cls-hooked
  patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.

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

  // queue ui
  const queueUiService = app.select(QueueModule).get(QueueService);
  app.use(
    process.env.BULL_BOARD_ADMIN_ROUTE,
    expressBasicAuth({
      users: {
        [process.env.BULL_BOARD_ADMIN_USERNAME]:
          process.env.BULL_BOARD_ADMIN_PASSWORD,
      },
      challenge: true,
    }),
    queueUiService.getRouter,
  );

  const port = getNumber(process.env.PORT);
  await app.listen(port);

  console.info(
    `Queue ui: http://localhost:${port}` + process.env.BULL_BOARD_ADMIN_ROUTE,
  );
  console.info(`Server is running on: http://localhost:${port}`);
  return app;
}
void bootstrap();
