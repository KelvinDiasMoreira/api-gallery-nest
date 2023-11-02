import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Post('create')
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createUser(createUserDTO);
  }

  @Patch('edit/:id')
  editUser(@Body() updateUserDTO: CreateUserDTO, @Param('id') id: number) {
    return this.usersService.editUser(updateUserDTO, id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
