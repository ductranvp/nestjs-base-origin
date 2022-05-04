import { define } from 'typeorm-seeding';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { RoleConstant } from '../../constants';
import { Faker } from '@faker-js/faker';

define(UserEntity, (faker: Faker) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email(firstName, lastName);
  const phone = faker.phone.phoneNumber();
  const isActive = true;

  const user = new UserEntity();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.role = RoleConstant.USER;
  user.password = '123456';
  user.phone = phone;
  user.isActive = isActive;

  return user;
});
