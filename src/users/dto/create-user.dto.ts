import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;
}
