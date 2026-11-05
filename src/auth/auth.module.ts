import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports:[UsersModule, JwtModule.register({
    secret:"qwertyuiop1234567890",
    signOptions:{expiresIn:'40d'}
  })],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {
}
