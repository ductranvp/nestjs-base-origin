import { Global, Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { FileService } from './file.service';

const services = [AwsS3Service, FileService];

@Global()
@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class SharedModule {}
