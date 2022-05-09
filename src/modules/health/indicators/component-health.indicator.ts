import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ComponentIndicatorConstant } from '../health.constant';
import { promiseWithTimeout } from '../../../common/utils';

@Injectable()
export class ComponentHealthIndicator extends HealthIndicator {
  constructor(public readonly awsS3Service: AwsS3Service) {
    super();
  }
  async isHealthy(
    key: ComponentIndicatorConstant,
    { timeout } = { timeout: 1000 },
  ): Promise<HealthIndicatorResult> {
    switch (key) {
      case ComponentIndicatorConstant.S3:
        try {
          const data = await promiseWithTimeout(
            timeout,
            this.awsS3Service.getBucketAlc(),
          );
          return this.getStatus(key, true, { data });
        } catch (ex) {
          throw new HealthCheckError(`${key} error`, ex);
        }
      default:
        throw new HealthCheckError(
          `${key} not found`,
          new Error(`${key} not found`),
        );
    }
  }
}
