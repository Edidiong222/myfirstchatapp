import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { request } from 'http';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    login(
        @Body('email') email:string,
        @Body('password') password:string
    ){
        return this.authService.login(email,password)
    }

    @Post('register')
    register(@Body('email') email:string, @Body('password') password:string){
        return this.authService.register({email, password})
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() request:any){
        return request.user
    }
}
