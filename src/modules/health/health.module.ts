import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ComponentHealthIndicator } from './indicators/component-health.indicator';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TerminusModule],
  providers: [ComponentHealthIndicator],
  exports: [],
  controllers: [HealthController],
})
export class HealthModule {}
