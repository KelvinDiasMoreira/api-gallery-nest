import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService],
    exports: [UsersModule]
})
export class UsersModule {}
