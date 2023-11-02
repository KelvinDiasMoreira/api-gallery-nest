import { Inject, Injectable } from '@nestjs/common';

import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { EditUserUseCase } from './use-cases/edit-user.use-case';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  @Inject(CreateUserUseCase)
  private createUserUseCase: CreateUserUseCase;

  @Inject(GetAllUsersUseCase)
  private getAllUsersUseCase: GetAllUsersUseCase;

  @Inject(GetUserByIdUseCase)
  private getUserByIdUseCase: GetUserByIdUseCase;

  @Inject(EditUserUseCase)
  private editUserUseCase: EditUserUseCase;

  @Inject(DeleteUserUseCase)
  private deleteUserUseCase: DeleteUserUseCase;

  async getAllUsers() {
    return this.getAllUsersUseCase.getAllUsers();
  }

  async getUserById(id: number) {
    return this.getUserByIdUseCase.getUserById(id);
  }

  async createUser(createUserDTO: CreateUserDTO) {
    return this.createUserUseCase.createUser(createUserDTO);
  }

  async editUser(updateUserDTO: UpdateUserDTO, id: number) {
    return this.editUserUseCase.editUser(updateUserDTO, id);
  }

  async deleteUser(id: number) {
    return this.deleteUserUseCase.deleteUser(id);
  }
}
