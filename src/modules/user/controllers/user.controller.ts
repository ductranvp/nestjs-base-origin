import { Controller, Logger } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ReplaceUserDto } from '../dtos/replace-user.dto';

@Crud({
  model: {
    type: UserEntity,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
    replace: ReplaceUserDto,
  },
})
@ApiTags('users')
@Controller('users')
export class UserController implements CrudController<UserEntity> {
  private readonly logger = new Logger(UserController.name);

  constructor(public service: UserService) {}
}
