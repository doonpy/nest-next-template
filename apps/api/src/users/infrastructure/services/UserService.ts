import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import UserServiceInterface from '../../applications/services/UserServiceInterface';
import User from '../../domain/entities/User';
import UserRepositoryInterface, {
  GetUsersParams,
  USER_REPOSITORY_TOKEN
} from '../../domain/repositories/UserRepositoryInterface';

@Injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: UserRepositoryInterface
  ) {}

  /** @inheritDoc */
  public async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.userRepository.create(data);

    return new User(user);
  }

  /** @inheritDoc */
  public async getUsers(params: GetUsersParams): Promise<User[]> {
    const users = await this.userRepository.getUsers(params);

    return users.map((user) => new User(user));
  }
}
