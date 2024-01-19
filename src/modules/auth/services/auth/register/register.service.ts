import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from 'src/modules/auth/database/repositories/abstract/IUser.repository';
import { IValidateRegisterUserDTO } from './register.dto';
import { hash, genSalt } from 'bcrypt';
import { REPOSITORIES_NAME } from 'src/shared/enums/repository_enum';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(REPOSITORIES_NAME.user_repository)
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, email, password }: IValidateRegisterUserDTO) {
    const userExists = await this.userRepository.findByEmail({
      email,
    });

    if (userExists) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    if (!this.validatePassword(password)) {
      throw new UnauthorizedException(
        'Senha deve conter no mínimo 6 caracteres',
      );
    }

    const hashedPassword = await this.hashPassword(password);

    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  private validatePassword(password: string) {
    if (password.length < 6) {
      return false;
    }

    return true;
  }

  private async hashPassword(password: string) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }
}

