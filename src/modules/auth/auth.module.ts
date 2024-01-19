import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './database/repositories/implementations/user.service';
import { AuthController } from './controllers/auth/auth.controller';
import { LoginService } from './services/auth/login/login.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './database/models/User.model';
import { RegisterService } from './services/auth/register/register.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    LoginService,
    RegisterService,
    JwtService,
  ],
})
export class AuthModule {}
