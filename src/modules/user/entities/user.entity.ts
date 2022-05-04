import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base';
import { RoleConstant } from '../../../constants';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({
    type: 'enum',
    enum: RoleConstant,
    default: RoleConstant.USER,
    nullable: true,
  })
  role?: RoleConstant;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  isActive?: boolean;
}
