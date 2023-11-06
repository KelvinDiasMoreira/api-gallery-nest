import { Controller, Delete, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GetAllImagesPerUserUseCase } from './use-cases/get-all-images-per-user.use-case';
import { DeleteImagePerUserUseCase } from './use-cases/delete-image-per-user.use-case';
import { GetImageByIdUseCase } from './use-cases/get-image-by-id.use-case';
import { UploadImgUseCase } from './use-cases/upload-img.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('image')
@Controller()
export class UploadImgController {
    constructor(
        private uploadImgUseCase: UploadImgUseCase,
        private getAllImagesPerUserUseCase: GetAllImagesPerUserUseCase,
        private deleteImagePerUserUseCase: DeleteImagePerUserUseCase,
        private getImageByIdUseCase: GetImageByIdUseCase
    ) { }

    @UseGuards(AuthGuard)
    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
        return this.uploadImgUseCase.uploadImg(file, req.user);
    }

    @UseGuards(AuthGuard)
    @Get('images')
    getAllImagesByUser(@Request() req: any) {
        return this.getAllImagesPerUserUseCase.getAllImages(req.user);
    }

    @UseGuards(AuthGuard)
    @Get('image/:id')
    getImageById(@Request() req: any, @Param('id') idImage: string) {
        return this.getImageByIdUseCase.getImageById(req.user, idImage);
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    deleteImagePerUser(@Request() req: any, @Param('id') idImage: string) {
        return this.deleteImagePerUserUseCase.deleteImagePerUser(req.user, idImage);
    }

}
