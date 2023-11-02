import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DeleteUserUseCase {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async deleteUser(id: number) {
    const userToDeleteExist = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!userToDeleteExist) throw new NotFoundException('User not found');
    return this.prisma.user.delete({ where: { id } });
  }
}
