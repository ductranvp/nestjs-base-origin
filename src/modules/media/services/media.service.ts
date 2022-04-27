import { Injectable } from '@nestjs/common';
import { IFile } from '../../../interfaces/IFile';
import { FileService } from '../../../shared/services/file.service';
import { MediaRepository } from '../repositories/media.repository';
import { MediaEntity } from '../entities/media.entity';
import { CustomException } from '../../../exceptions/custom.exception';
import { CustomExceptionConstant } from '../../../constants/custom-exception.constant';

@Injectable()
export class MediaService {
  constructor(
    private mediaRepository: MediaRepository,
    private fileService: FileService,
  ) {}

  async uploadFile(file: IFile) {
    try {
      const category = 'files';

      // Maybe change category depend on file type

      const url = await this.fileService.uploadFile(category, file);
      const entity = new MediaEntity(url, file);
      return this.mediaRepository.save(entity);
    } catch (e) {
      throw new CustomException(CustomExceptionConstant.UPLOAD_FAILED);
    }
  }
}
