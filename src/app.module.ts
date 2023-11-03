import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UploadImgModule } from './upload-img/upload-img.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.development.env',
  }),
  DatabaseModule,
  AuthModule,
  UsersModule,
  UploadImgModule 
],

  controllers: [],
  providers: [],
})
export class AppModule {}
