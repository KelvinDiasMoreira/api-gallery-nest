import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserDTO } from '../dto/update-user.dto';

@Injectable()
export class EditUserUseCase {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async editUser(updateUserDTO: UpdateUserDTO, id: number) {
    const userToEditExist = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!userToEditExist) throw new NotFoundException('User not found');
    return this.prisma.user.update({
      where: { id },
      data: updateUserDTO,
    });
  }
}
