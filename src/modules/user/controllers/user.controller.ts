import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() payload: UserEntity) {
    return this.userService.createUser(payload);
  }

  @Get()
  getUsers(@Query() query: any) {
    return this.userService.getUsers(query);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() payload: UserEntity) {
    return this.userService.updateUser(id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
