import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdatePasswordUserDTO {
    @ApiProperty({description: "Login do usuário"})
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty({description: "Senha atual do usuário"})
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({description: "Nova senha do usuário"})
    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
