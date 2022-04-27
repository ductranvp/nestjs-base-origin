import { Global, Module } from '@nestjs/common';

import { AppConfigService } from './services/app-config.service';
import { AwsS3Service } from './services/aws-s3.service';
import { FileService } from './services/file.service';

const services = [AppConfigService, AwsS3Service, FileService];

@Global()
@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class SharedModule {}
