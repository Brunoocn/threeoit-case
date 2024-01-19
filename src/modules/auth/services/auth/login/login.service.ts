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
import { REPOSITORIES_NAME } from 'src/shared/enums/repository_enum';

@Injectable()
export class LoginService {
  constructor(
    @Inject(REPOSITORIES_NAME.user_repository)
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

    if (!this.validatePasswordIsMatch(password, userExists.password)) {
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

  private async validatePasswordIsMatch(
    password: string,
    userPassword: string,
  ) {
    const isPasswordMatch = await compare(password, userPassword);

    if (!isPasswordMatch) {
      return false;
    }

    return true;
  }
}

