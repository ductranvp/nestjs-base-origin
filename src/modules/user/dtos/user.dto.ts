import { BaseDto } from '../../../common/base';
import { RoleConstant } from '../../../constants';
import { UserEntity } from '../user.entity';

export class UserDto extends BaseDto {
  firstName?: string;

  lastName?: string;

  role?: RoleConstant;

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
