import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { DatabaseModule } from 'src/database/database.module';
import { EditUserPasswordUseCase } from './use-cases/edit-user-password.use-case';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [
        CreateUserUseCase,
        GetAllUsersUseCase,
        GetUserByIdUseCase,
        EditUserPasswordUseCase,
        DeleteUserUseCase,
    ],
    exports: []
})
export class UsersModule { }
