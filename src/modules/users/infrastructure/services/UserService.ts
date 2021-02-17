import { Inject, Injectable } from '@nestjs/common';

import UserServiceInterface from '../../applications/services/UserServiceInterface';
import CreateUserInput from '../../domain/graphql/CreateUserInput';
import GetUsersArgs from '../../domain/graphql/GetUsersArgs';
import User from '../../domain/models/User';
import UserRepositoryInterface from '../../domain/repositories/UserRepositoryInterface';

@Injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface') private readonly userRepository: UserRepositoryInterface
  ) {}

  public async create(input: CreateUserInput): Promise<User> {
    const entity = this.userRepository.createEntity(input);
    const { id, name, age, createdAt, updatedAt } = await this.userRepository.save(entity);

    return new User(id, name, age, createdAt, updatedAt);
  }

  public async getUsers(args: GetUsersArgs): Promise<User[]> {
    const userEntities = await this.userRepository.getUsers(args);

    return userEntities.map(
      ({ id, name, age, createdAt, updatedAt }) => new User(id, name, age, createdAt, updatedAt)
    );
  }
}
