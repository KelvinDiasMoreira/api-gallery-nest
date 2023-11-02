import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  @Inject(PrismaService)
  private prisma: PrismaService;

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
    return user;
  }

  private encriptPw = async (pw: string) => {
    const rounds = 5;
    const salt = await bcrypt.genSalt(rounds);
    const pwHash = await bcrypt.hash(pw, salt);
    return pwHash;
  };
}
