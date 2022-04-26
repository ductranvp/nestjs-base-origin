import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return 'All Users';
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return `Get user with id: ${id}`;
  }
}
