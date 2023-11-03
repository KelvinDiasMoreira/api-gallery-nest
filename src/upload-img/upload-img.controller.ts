import { Controller, Delete, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadImgUseCase } from './use-cases/upload-img.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetAllImagesPerUserUseCase } from './use-cases/get-all-images-per-user.use-case';
import { DeleteImagePerUserUseCase } from './use-cases/delete-image-per-user.use-case';


@Controller()
export class UploadImgController {
    constructor(
        private uploadImgUseCase: UploadImgUseCase,
        private getAllImagesPerUserUseCase: GetAllImagesPerUserUseCase,
        private deleteImagePerUserUseCase: DeleteImagePerUserUseCase
    ){}
    
    @UseGuards(AuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req: any){
        return this.uploadImgUseCase.uploadImg(file, req.user);
    }

    @UseGuards(AuthGuard)
    @Get('images')
    getAllImagesByUser(@Request() req: any){
        return this.getAllImagesPerUserUseCase.getAllImages(req.user);
    }

    @UseGuards(AuthGuard)
    @Delete('images/delete/:id')
    deleteImagePerUser(@Request() req: any, @Param('id') id: string){
        return this.deleteImagePerUserUseCase.deleteImagePerUser(req.user, id);
    }

}
