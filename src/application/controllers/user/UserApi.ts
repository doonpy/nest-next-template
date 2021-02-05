import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import CreateUserUseCase from '../../use-cases/user/CreateUserUseCase';
import GetManyUsersUseCase from '../../use-cases/user/GetManyUsersUseCase';
import { USER_API_ROOT_PATH } from './constants';

@Controller(USER_API_ROOT_PATH)
export default class UserApi {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetManyUsersUseCase
  ) {}

  @Post()
  public async create(
    @Body() createUserDto: CreateUserInput
  ): Promise<ApiResponse<CreateUserResponse>> {
    this.createUserUseCase.setInput(createUserDto);

    return this.createUserUseCase.execute();
  }

  @Get()
  public async getMany(
    @Query() queries: GetManyUserQueries
  ): Promise<ApiResponse<GetManyUsersResponse>> {
    this.getAllUserUseCase.setQueries(queries);

    return this.getAllUserUseCase.execute();
  }
}
