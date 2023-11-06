import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CreateUserUseCase {  

  constructor(private prisma: PrismaService){}
  
  private encriptPw = async (pw: string) => {
    const rounds = 5;
    const salt = await bcrypt.genSalt(rounds);
    const pwHash = await bcrypt.hash(pw, salt);
    return pwHash;
  };

  async createUser(createUserDTO: CreateUserDTO) {
    const { name, password, email, login } = createUserDTO;

    let userExist = await this.prisma.user.findMany({
      where: {
        OR: [{ email }, { login }],
      },
    });

    if (userExist.length) throw new ConflictException('User already exist');

    const passwordHashed = await this.encriptPw(password);

    const user = await this.prisma.user.create({
      data: {
        name,
        login,
        password: passwordHashed,
        email,
      },
    });
    return {
      name: user.name,
      login: user.login,
      email: user.email,
      createdAt: user.createdAt
    };
  }
}
