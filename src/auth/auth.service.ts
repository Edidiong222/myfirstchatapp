import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService:JwtService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email)
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (user && isPasswordValid) {
            const { password, ...result } = user
            return result
        }
        throw new UnauthorizedException("Invalid email or password")
    }
    async login(email:string, password:string){
        const user = await this.validateUser(email,password);

        const payload = {
            sub:user.id,
            email:user.email
        }

        return {access_token:await this.jwtService.signAsync(payload)}
    }
   
}
