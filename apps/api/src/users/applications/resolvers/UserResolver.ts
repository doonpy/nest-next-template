import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import CreateUserInput from '../../domain/graphql/CreateUserInput';
import GetUsersArgs from '../../domain/graphql/GetUsersArgs';
import UserType from '../../domain/graphql/UserType';
import CreateUserUseCase from '../use-cases/CreateUserUseCase';
import GetUsersUseCase from '../use-cases/GetUsersUseCase';

@Resolver(() => UserType)
export default class UserResolver {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  @Query(() => [UserType], { defaultValue: [] })
  public async users(@Args() args: GetUsersArgs): Promise<UserType[]> {
    return this.getUsersUseCase.process(args);
  }

  @Mutation(() => UserType)
  public async createUser(@Args('input') input: CreateUserInput): Promise<UserType> {
    return this.createUserUseCase.process(input);
  }
}
