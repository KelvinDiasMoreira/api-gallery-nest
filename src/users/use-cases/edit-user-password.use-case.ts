import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UpdatePasswordUserDTO } from '../dto/update-user-password.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class EditUserPasswordUseCase {
  constructor(private prisma: PrismaService){}

  private encriptPw = async (pw: string) => {
    const rounds = 5;
    const salt = await bcrypt.genSalt(rounds);
    const pwHash = await bcrypt.hash(pw, salt);
    return pwHash;
  };

  async editUserPassword(updatePasswordUserDTO: UpdatePasswordUserDTO, id: number) {
    const { password, newPassword, login } = updatePasswordUserDTO
    const userToEditExist = await this.prisma.user.findUnique({
      where: { login },
    });

    if (!userToEditExist) throw new NotFoundException('User not found');

    const isTheSamePassword = await bcrypt.compare(password, userToEditExist.password);
    
    if(!isTheSamePassword) throw new UnauthorizedException();
    
    const newPasswordHashed = await this.encriptPw(newPassword);

    return this.prisma.user.update({
      where: { login },
      data: {
        password: newPasswordHashed
      },
    });
  }
}
