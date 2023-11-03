import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

interface IreqProps {
    name: string,
    email: string,
    user_id: number,
    iat: number,
    exp: number
}



@Injectable()
export class DeleteImagePerUserUseCase {
    constructor(
        private prisma: PrismaService
    ) {}

    async deleteImagePerUser(req: IreqProps, id: string) {
        const imagesByUser = await this.prisma.image.findMany({
            where: {
                AND: [
                    { authorId: req.user_id },
                    { id }
                ]
            },
        })
        if (!imagesByUser.length) throw new NotFoundException();
        await this.prisma.image.delete({
            where: {
                id
            }
        })
        return
    }
}