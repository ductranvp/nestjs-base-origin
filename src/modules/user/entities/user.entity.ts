import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base';
import { RoleConstant } from '../../../constants';
import { ApiHideProperty, ApiResponseProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity extends BaseEntity {
  @ApiResponseProperty()
  @Column({ nullable: true })
  firstName?: string;

  @ApiResponseProperty()
  @Column({ nullable: true })
  lastName?: string;

  @ApiResponseProperty()
  @Column({
    type: 'enum',
    enum: RoleConstant,
    default: RoleConstant.USER,
    nullable: true,
  })
  role?: RoleConstant;

  @ApiResponseProperty()
  @Column({ unique: true, nullable: true })
  email?: string;

  @ApiHideProperty()
  @Column({ nullable: true })
  password?: string;

  @ApiResponseProperty()
  @Column({ nullable: true })
  phone?: string;

  @ApiResponseProperty()
  @Column({ nullable: true })
  avatar?: string;

  @ApiResponseProperty()
  @Column({ nullable: true })
  isActive?: boolean;
}
