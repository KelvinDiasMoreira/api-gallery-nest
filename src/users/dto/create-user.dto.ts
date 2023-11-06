import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({description: "Nome completo do usuário"})
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({description: "Login do usuário"})
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @ApiProperty({description: "Senha a ser criada pelo usuário"})
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  readonly password: string;

  @ApiProperty({description: "Email do usuário"})
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;
}
