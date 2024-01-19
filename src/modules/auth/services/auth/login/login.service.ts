import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserRepository } from 'src/modules/auth/database/repositories/abstract/IUser.repository';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { IUserFiltered, IValidateUserDTO } from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,
    
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: IValidateUserDTO) {
    const userExists = await this.userRepository.findByEmail({
      email,
    });

    if (!userExists) {
      throw new NotFoundException('Usuario não encontrardado');
    }

    if (!this.validatePasswordIsMatch(password)) {
      throw new UnauthorizedException('Email e/ou senha inválidos');
    }

    const userFiltered: IUserFiltered = {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
    };

    const token = this.jwtService.sign(
      {
        user: userFiltered,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    return {
      token,
      user: userFiltered,
    };
  }

  private validatePasswordIsMatch(password: string) {
    const isPasswordMatch = compare(password, password);

    if (!isPasswordMatch) {
      return false;
    }

    return true;
  }
}

