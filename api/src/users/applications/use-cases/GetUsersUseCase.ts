import { Inject, Injectable } from '@nestjs/common';

import ValidationService from '../../../common/services/ValidationService';
import GetUsersArgs from '../../domain/graphql/GetUsersArgs';
import UserType from '../../domain/graphql/UserType';
import UserServiceInterface, { USER_SERVICE_TOKEN } from '../services/UserServiceInterface';

@Injectable()
export default class GetUsersUseCase {
  constructor(
    private readonly validationService: ValidationService,
    @Inject(USER_SERVICE_TOKEN) private readonly userService: UserServiceInterface
  ) {}

  /**
   * Process get users use case
   */
  public async process(args: GetUsersArgs): Promise<UserType[]> {
    await this.validationService.validate<GetUsersArgs>(args, GetUsersArgs);

    const { limit, offset, name } = args;
    const users = await this.userService.getUsers({
      skip: offset,
      take: limit,
      where: { name: { contains: name } }
    });

    return users.map((user) => user.convertToGraphql());
  }
}
