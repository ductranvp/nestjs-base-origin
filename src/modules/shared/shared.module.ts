import { Global, Module } from '@nestjs/common';
import { AwsS3Service } from './services/aws-s3.service';
import { FileService } from './services/file.service';
import { FirebaseService } from './services/firebase.service';

const services = [AwsS3Service, FileService, FirebaseService];

@Global()
@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class SharedModule {}
