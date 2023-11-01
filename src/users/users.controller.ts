import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface } from './users.entity';

@Controller('tasks')
export class UsersController {
    constructor(private readonly tasksService: UsersService){}

    @Get()
    getAllTasks(){
        return this.tasksService.getAllTasks(); 
    }

    @Get(':id')
    getTaskById(@Param('id') id:number){
        return this.tasksService.getTaskById(+id)
    }

    @Post('create')
    createTask(@Body() body: UserInterface){
        return this.tasksService.createTask(body);
    }

    @Patch('edit/:id')
    editTask(@Body() body: UserInterface, @Param('id') id:number){
        return this.tasksService.editTask(body, +id);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('delete/:id')
    deletetask(@Param('id') id:number){
        return this.tasksService.deleteTask(id);
    }
}
