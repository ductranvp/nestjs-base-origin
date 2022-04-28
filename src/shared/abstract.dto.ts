import type { AbstractEntity } from './abstract.entity';

export class AbstractDto {
  id?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(entity: AbstractEntity) {
    this.id = entity.id;
    this.createdBy = entity.createdBy;
    this.updatedBy = entity.updatedBy;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.deletedAt = entity.deletedAt;
  }
}
