import { Injectable, NotFoundException, UnprocessableEntityException, } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

interface IreqProps {
    name: string,
    email: string,
    user_id: number,
    iat: number,
    exp: number
}

@Injectable()
export class GetImageByIdUseCase {
    constructor(
        private prisma: PrismaService
    ) { }

    async getImageById(req: IreqProps, imageId: string) {
        const imagesByUser = await this.prisma.image.findMany({
            where: {
                AND: [
                    {authorId: req.user_id},
                    {id: imageId}
                ]
            },
        })
        if (!imagesByUser) throw new NotFoundException("Not images sended by user");
        return imagesByUser;
    }
}