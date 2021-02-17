import { Inject, Injectable } from '@nestjs/common';

import CreateUserInput from '../../domain/graphql/CreateUserInput';
import UserType from '../../domain/graphql/UserType';
import UserServiceInterface, { USER_SERVICE_TOKEN } from '../services/UserServiceInterface';

@Injectable()
export default class CreateUserUseCase {
  constructor(@Inject(USER_SERVICE_TOKEN) private readonly userService: UserServiceInterface) {}

  public async process(input: CreateUserInput): Promise<UserType> {
    const createdUser = await this.userService.create(input);

    return createdUser.convertToGraphQLType();
  }
}
