import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { AppConfigService } from './shared/services/app-config.service';
import { setupSwagger } from './shared/setup-swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.select(SharedModule).get(AppConfigService);
  // logger
  app.useLogger(app.get(Logger));

  // cors
  app.enableCors(configService.corsConfig);

  // document
  if (configService.documentationEnabled) {
    setupSwagger(app);
  }

  const port = configService.appConfig.port;
  await app.listen(port);
  console.info(`Server is running on port ${port}`);
  return app;
}
void bootstrap();
