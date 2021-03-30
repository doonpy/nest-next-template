import { Module } from '@nestjs/common';

import UserResolver from './applications/resolvers/UserResolver';
import { USER_SERVICE_TOKEN } from './applications/services/UserServiceInterface';
import CreateUserUseCase from './applications/use-cases/CreateUserUseCase';
import GetUsersUseCase from './applications/use-cases/GetUsersUseCase';
import { USER_REPOSITORY_TOKEN } from './domain/repositories/UserRepositoryInterface';
import UserRepository from './infrastructure/repositories/UserRepository';
import UserService from './infrastructure/services/UserService';

@Module({
  providers: [
    { provide: USER_SERVICE_TOKEN, useClass: UserService },
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
    GetUsersUseCase,
    UserResolver,
    CreateUserUseCase
  ]
})
export default class UserModule {}
