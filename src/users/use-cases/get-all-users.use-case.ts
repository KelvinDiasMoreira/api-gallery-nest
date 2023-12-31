import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private prisma: PrismaService) { }

  async getAllUsers() {
    return await this.prisma.user.findMany({
      include: {
        images: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });
  }
}
