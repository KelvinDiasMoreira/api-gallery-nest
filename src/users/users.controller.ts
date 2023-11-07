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
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('users')
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

  @Post('create')
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.createUserUseCase.createUser(createUserDTO);
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  getUserById(@Param('id') id: number) {
    return this.getUserByIdUseCase.getUserById(id);
  }


  @UseGuards(AuthGuard)
  @Patch('user/password/:id')
  editUser(@Body() updatePasswordUserDTO: UpdatePasswordUserDTO, @Param('id') id: number) {
    return this.editUserPasswordUseCase.editUserPassword(updatePasswordUserDTO, id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('user/:id')
  deleteUser(@Param('id') id: number) {
    return this.deleteUserUseCase.deleteUser(id);
  }
}
