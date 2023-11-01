import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserInterface } from './users.entity';

@Injectable()
export class UsersService {
    private tasks: UserInterface[] = [
        {
            id: 1,
            description: "teste",
            isFinished: false,
        }
    ]

    getAllTasks(){
        return this.tasks
    }

    getTaskById(id:number){
        return this.tasks.find(task=>task.id === id);
    }

    createTask(body: UserInterface){
        let newId = ((this.tasks.length) + 1 );
        this.tasks.push({
            id: newId,
            ...body
        })
        return {
            id: newId,
            response: 'Tarefa criada com sucesso',
        }
    }

    editTask(body: UserInterface, id: number){
        let indexToSearchAndEdit = this.tasks.findIndex(task=>task.id === id);
        if(!indexToSearchAndEdit){
            throw new HttpException("Tarefa não existe", HttpStatus.NOT_FOUND);  
        } 
        this.tasks[indexToSearchAndEdit] = {
            id,
            ...body
        }
        return {
            response: `Task com o id ${id} editada com sucesso`
        }
    }

    deleteTask(id:number){
        let indexToEdit = this.tasks.findIndex(task=>task.id === id);
        this.tasks.splice(indexToEdit, 1);
        return 
    }

    
}
