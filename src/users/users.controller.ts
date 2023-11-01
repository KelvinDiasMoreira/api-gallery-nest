import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    getAllTasks(){
        return this.usersService.getAllUsers(); 
    }

    @Get(':id')
    getTaskById(@Param('id') id:number){
        return this.usersService.getUserById(id)
    }

    @Post('create')
    createTask(@Body() createUserDTO: CreateUserDTO){
        return this.usersService.createUser(createUserDTO);
    }

    @Patch('edit/:id')
    editTask(@Body() updateUserDTO: CreateUserDTO, @Param('id') id:number){
        return this.usersService.editUser(updateUserDTO, id);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('delete/:id')
    deletetask(@Param('id') id:number){
        return this.usersService.deleteUser(id);
    }
}
