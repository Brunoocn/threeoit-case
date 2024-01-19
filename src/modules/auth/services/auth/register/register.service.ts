import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/modules/auth/database/repositories/abstract/IUser.repository';
import { IValidateRegisterUserDTO } from './register.dto';
import { hash } from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, email, password }: IValidateRegisterUserDTO) {
    const userExists = await this.userRepository.findByEmail({
      email,
    });

    if (userExists) {
      throw new Error('Email já cadastrado');
    }

    if (this.validatePassword(password)) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
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
    const hashedPassword = await hash(password, process.env.ROUNDS_OF_HASHING);

    return hashedPassword;
  }
}

