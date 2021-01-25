import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import CreateUserUseCase from '../../use-cases/user/CreateUserUseCase';
import GetManyUsersUseCase from '../../use-cases/user/GetManyUsersUseCase';
import { USER_API_ROOT_PATH, UserApiPaths } from './constants';

@Controller(USER_API_ROOT_PATH)
export default class UserApi {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetManyUsersUseCase
  ) {}

  @Post(UserApiPaths.CREATE)
  public async create(@Body() createUserDto: CreateUser): Promise<void> {
    await this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  public async getMany(@Query() queries: GetManyUserQueries): Promise<GetManyUsers> {
    this.getAllUserUseCase.setQueries(queries);

    return this.getAllUserUseCase.execute();
  }
}
