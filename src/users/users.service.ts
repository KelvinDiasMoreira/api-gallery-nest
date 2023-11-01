import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllUsers() {
        return this.prisma.user.findMany();
    }

    async getUserById(id: number) {
        return this.prisma.user.findUnique({ where: { id } })
    }

    async createUser(createUserDTO: CreateUserDTO) {
        const { name, password, email, login } = createUserDTO;

        let userExist = await this.prisma.user.findMany({
            where: {
                OR: [
                    {email},
                    {login}
                ]
            }
        });

        if (userExist.length) throw new ConflictException("User already exist");

        const passwordHashed = await this.encriptPw(password);

        const user = await this.prisma.user.create({
            data: {
                name,
                login,
                password: passwordHashed,
                email
            }
        })
        return user;
    }

    editUser(updateUserDTO: UpdateUserDTO, id: number) {

        // let indexToSearchAndEdit = this.tasks.findIndex(task=>task.id === id);
        // if(!indexToSearchAndEdit){
        //     throw new HttpException("Tarefa não existe", HttpStatus.NOT_FOUND);  
        // } 
        // this.tasks[indexToSearchAndEdit] = {
        //     id,
        //     ...body
        // }
        // return {
        //     response: `Task com o id ${id} editada com sucesso`
        // }
    }

    deleteUser(id: number) {
        // let indexToEdit = this.tasks.findIndex(task=>task.id === id);
        // this.tasks.splice(indexToEdit, 1);
        // return 
    }

    private encriptPw = async (pw: string) => {
        const rounds = 5
        const salt = await bcrypt.genSalt(rounds);
        const pwHash = await bcrypt.hash(pw, salt)
        return pwHash
    }


}
