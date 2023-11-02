import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GetAllUsersUseCase {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
}
