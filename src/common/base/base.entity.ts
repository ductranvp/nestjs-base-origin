'use strict';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiResponseProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiResponseProperty()
  @Column('uuid', { nullable: true })
  createdBy?: string;

  @ApiResponseProperty()
  @Column('uuid', { nullable: true })
  updatedBy?: string;

  @ApiResponseProperty()
  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt?: Date;

  @ApiResponseProperty()
  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt?: Date;

  @ApiHideProperty()
  @DeleteDateColumn({
    type: 'timestamp with time zone',
  })
  deletedAt?: Date;
}
