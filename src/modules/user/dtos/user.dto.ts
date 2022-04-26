import { AbstractDto } from '../../../common/dtos/abstract.dto';
import { RoleType } from '../../../constants/role-type.constant';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends AbstractDto {
  firstName?: string;

  lastName?: string;

  role?: RoleType;

  email?: string;

  password?: string;

  phone?: string;

  avatar?: string;

  isActive?: boolean;

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.avatar = user.avatar;
    this.isActive = user.isActive;
  }
}