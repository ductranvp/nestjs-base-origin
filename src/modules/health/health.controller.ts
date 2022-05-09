import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ComponentHealthIndicator } from './indicators/component-health.indicator';
import { ComponentIndicatorConstant } from './health.constant';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    // HttpHealthIndicator requires the installation of the @nestjs/axios package and the import of HttpModule.
    private health: HealthCheckService,
    private server: HttpHealthIndicator,
    private database: TypeOrmHealthIndicator,
    public readonly component: ComponentHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const port = process.env.PORT;
    return this.health.check([
      () => this.database.pingCheck('database', { timeout: 1000 }),
      () => this.server.pingCheck('server', `http://localhost:` + port),
      () => this.component.isHealthy(ComponentIndicatorConstant.S3),
    ]);
  }
}
