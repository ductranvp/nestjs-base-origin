'use strict';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid', { nullable: true })
  createdBy?: string;

  @Column('uuid', { nullable: true })
  updatedBy?: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
  })
  deletedAt?: Date;
}
