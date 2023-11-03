import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UploadImgUseCase } from './use-cases/upload-img.use-case';
import { UploadImgController } from './upload-img.controller';
import { GetAllImagesPerUserUseCase } from './use-cases/get-all-images-per-user.use-case';
import { DeleteImagePerUserUseCase } from './use-cases/delete-image-per-user.use-case';

@Module({
    imports: [DatabaseModule],
    controllers: [UploadImgController],
    providers: [UploadImgUseCase, GetAllImagesPerUserUseCase, DeleteImagePerUserUseCase]
})
export class UploadImgModule { }
