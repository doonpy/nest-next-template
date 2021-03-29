import { Inject, Injectable } from '@nestjs/common';

import GetUsersArgs from '../../domain/graphql/GetUsersArgs';
import UserType from '../../domain/graphql/UserType';
import UserServiceInterface, { USER_SERVICE_TOKEN } from '../services/UserServiceInterface';

@Injectable()
export default class GetUsersUseCase {
  constructor(@Inject(USER_SERVICE_TOKEN) private readonly userService: UserServiceInterface) {}

  public async process(args: GetUsersArgs): Promise<UserType[]> {
    const users = await this.userService.getUsers(args);

    return users.map((user) => user.convertToGraphQLType());
  }
}
