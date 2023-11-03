import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdatePasswordUserDTO {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
