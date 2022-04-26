import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { AppConfigService } from './shared/services/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(SharedModule).get(AppConfigService);
  app.enableCors(configService.corsConfig);
  const port = configService.appConfig.port;
  await app.listen(port);
}
bootstrap();
