import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base';
import { IFile } from './interfaces/IFile';

@Entity()
export class MediaEntity extends BaseEntity implements IFile {
  constructor(url?: string, file?: IFile) {
    super();
    this.url = url;
    this.encoding = file?.encoding;
    this.fieldname = file?.fieldname;
    this.mimetype = file?.mimetype;
    this.originalname = file?.originalname;
    this.size = file?.size;
  }
  @Column()
  url: string;

  @Column({ nullable: true })
  encoding: string;

  @Column({ nullable: true })
  fieldname: string;

  @Column({ nullable: true })
  mimetype: string;

  @Column({ nullable: true })
  originalname: string;

  @Column({ nullable: true })
  size: number;
}
