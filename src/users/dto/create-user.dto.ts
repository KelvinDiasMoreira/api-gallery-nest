import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDTO {
    @IsString()
    readonly name: string

    @IsString()
    readonly login: string

    @MinLength(8)
    @IsString()
    readonly password: string

    @IsEmail()
    @IsString()
    readonly email: string
}