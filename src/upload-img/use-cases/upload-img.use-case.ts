import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

interface IreqProps{
    name: string,
    email: string,
    user_id: number,
    iat: number,
    exp: number
}

@Injectable()
export class UploadImgUseCase {
    constructor(
        private prisma: PrismaService
    ){}

    async uploadImg(file: Express.Multer.File, req: IreqProps){;

        if(file.mimetype !== 'image/png') throw new UnprocessableEntityException();

        const fileInBase64 = file.buffer.toString('base64')
        const imageCreated = await this.prisma.image.create({
            data: {
                data: fileInBase64,
                name: file.originalname,
                authorId: req.user_id,
            }
        })
        return imageCreated
    }
}