import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserLoginDTO } from './dto/user-login.dto';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ){}

    async loginUser(userLoginDTO: UserLoginDTO){
        const {login, password: passwordDTO} = userLoginDTO

        let user = await this.prisma.user.findUnique({
            where: {
                login
            }
        })
        if(!user) throw new NotFoundException("User not found");
        
        const verifyHashPw = await bcrypt.compare(passwordDTO, user.password);

        if(!verifyHashPw) throw new BadRequestException();

        const payload = { name: user.name, email: user.email };
        return {
            token_access: this.jwtService.sign(payload)
        }
    }
}
