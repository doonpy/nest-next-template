import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import ValidationService from '../../../common/services/ValidationService';
import CreateUserInput from '../../domain/graphql/CreateUserInput';
import UserServiceInterface, { USER_SERVICE_TOKEN } from '../services/UserServiceInterface';

@Injectable()
export default class CreateUserUseCase {
  constructor(
    private readonly validationService: ValidationService,
    @Inject(USER_SERVICE_TOKEN) private readonly userService: UserServiceInterface
  ) {}

  /**
   * Process create user use case
   */
  public async process(input: CreateUserInput): Promise<User> {
    await this.validationService.validate<CreateUserInput>(input, CreateUserInput);
    const user = await this.userService.create(input);

    return user.convertToGraphql();
  }
}
