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
  UseGuards,
} from '@nestjs/common';
// import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePasswordUserDTO } from './dto/update-user-password.dto';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { EditUserPasswordUseCase } from './use-cases/edit-user-password.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class UsersController {
  constructor(
    private getUserByIdUseCase: GetUserByIdUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private editUserPasswordUseCase: EditUserPasswordUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private createUserUseCase: CreateUserUseCase,
    ) {}

  @UseGuards(AuthGuard)
  @Get('users')
  getAllUsers() {
    return this.getAllUsersUseCase.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get('users/:id')
  getUserById(@Param('id') id: number) {
    return this.getUserByIdUseCase.getUserById(id);
  }

  @Post('create')
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.createUserUseCase.createUser(createUserDTO);
  }

  @UseGuards(AuthGuard)
  @Patch('edit/user/password/:id')
  editUser(@Body() updatePasswordUserDTO: UpdatePasswordUserDTO, @Param('id') id: number) {
    return this.editUserPasswordUseCase.editUserPassword(updatePasswordUserDTO, id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  deleteUser(@Param('id') id: number) {
    return this.deleteUserUseCase.deleteUser(id);
  }
}
