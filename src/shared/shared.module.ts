import { Global, Module } from '@nestjs/common';

import { AwsS3Service, FileService } from './services';

const services = [AwsS3Service, FileService];

@Global()
@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class SharedModule {}
