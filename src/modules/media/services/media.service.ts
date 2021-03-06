import { Injectable } from '@nestjs/common';
import { MediaRepository } from '../repositories/media.repository';
import { MediaEntity } from '../entities/media.entity';
import { CustomException } from '../../../exceptions';
import { ExceptionConstant } from '../../../constants';
import { FileService } from '../../shared/services/file.service';
import { IFile } from '../interfaces/IFile';

@Injectable()
export class MediaService {
  constructor(
    private mediaRepository: MediaRepository,
    private fileService: FileService,
  ) {}

  get repo() {
    return this.mediaRepository;
  }

  async uploadFile(file: IFile) {
    try {
      const category = 'files';

      // Maybe change category depend on file type

      const url = await this.fileService.uploadFile(category, file);
      const entity = new MediaEntity(url, file);
      return this.mediaRepository.save(entity);
    } catch (e) {
      throw new CustomException(ExceptionConstant.UPLOAD_FAILED);
    }
  }
}
