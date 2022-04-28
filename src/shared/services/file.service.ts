import { Injectable } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { getFileExtension, uuid } from '../../utils/common.util';
import { IFile } from '../../interfaces/IFile';
import { AppConfigService } from './app-config.service';

@Injectable()
export class FileService {
  constructor(
    private s3Service: AwsS3Service,
    private configService: AppConfigService,
  ) {}

  async uploadFile(category: string, file: IFile) {
    const key = category + '/' + uuid() + '.' + getFileExtension(file);
    return this.s3Service.putObject({
      key,
      file,
    });
  }
}
