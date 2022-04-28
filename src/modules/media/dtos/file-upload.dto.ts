import { ApiProperty } from '@nestjs/swagger';
import { IFile } from '../../../interfaces';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: IFile;
}
