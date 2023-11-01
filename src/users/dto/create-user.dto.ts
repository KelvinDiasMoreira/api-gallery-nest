import { IsString } from 'class-validator'

export class CreateUserDTO {
    @IsString()
    readonly name: string

    @IsString()
    readonly login: string

    @IsString()
    readonly password: string

    @IsString()
    readonly email: string
}