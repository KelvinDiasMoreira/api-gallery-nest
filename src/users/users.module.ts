import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { EditUserUseCase } from './use-cases/edit-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        PrismaService,
        CreateUserUseCase,
        GetAllUsersUseCase,
        GetUserByIdUseCase,
        EditUserUseCase,
        DeleteUserUseCase
    ],
    exports: [UsersModule]
})
export class UsersModule { }
