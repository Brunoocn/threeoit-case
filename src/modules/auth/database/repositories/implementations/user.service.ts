import { Injectable } from '@nestjs/common';

import { ICreateUser, IFindUserByEmail } from '../abstract/userRepository.dto';

import { IUserRepository } from '../abstract/IUser.repository';
import { User } from '../../models/User.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findByEmail({ email }: IFindUserByEmail): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(data: ICreateUser): Promise<User> {
    const newUser = await this.userModel.create({
      ...data,
    });

    return newUser;
  }
}

