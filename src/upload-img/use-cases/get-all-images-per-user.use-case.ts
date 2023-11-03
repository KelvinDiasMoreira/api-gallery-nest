import { Injectable, NotFoundException, UnprocessableEntityException, } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

interface IreqProps {
    name: string,
    email: string,
    user_id: number,
    iat: number,
    exp: number
}



@Injectable()
export class GetAllImagesPerUserUseCase {
    constructor(
        private prisma: PrismaService
    ) { }

    async getAllImages(req: IreqProps) {
        const imagesByUser = await this.prisma.image.findMany({
            where: {
                authorId: req.user_id
            },
        })
        if (!imagesByUser) throw new NotFoundException("Not images sended by user");
        return imagesByUser;
    }
}