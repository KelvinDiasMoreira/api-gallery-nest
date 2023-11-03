import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private prisma: PrismaService){}

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }
}
