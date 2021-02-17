import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import ValidationService from '../../../common/services/ValidationService';
import CreateUserInput from '../../domain/graphql/CreateUserInput';
import GetUsersArgs from '../../domain/graphql/GetUsersArgs';
import UserType from '../../domain/graphql/UserType';
import CreateUserUseCase from '../use-cases/CreateUserUseCase';
import GetUsersUseCase from '../use-cases/GetUsersUseCase';

@Resolver(() => UserType)
export default class UserResolver {
  constructor(
    private readonly validationService: ValidationService,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  @Query(() => [UserType], { defaultValue: [] })
  public async users(@Args() args: GetUsersArgs): Promise<UserType[]> {
    await this.validationService.validate<GetUsersArgs>(args, GetUsersArgs);

    return this.getUsersUseCase.process(args);
  }

  @Mutation(() => UserType)
  public async createUser(@Args('input') input: CreateUserInput): Promise<UserType> {
    await this.validationService.validate<CreateUserInput>(input, CreateUserInput);

    return this.createUserUseCase.process(input);
  }
}
