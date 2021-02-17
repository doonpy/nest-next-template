import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from './applications/controllers/UserController';
import UserResolver from './applications/resolvers/UserResolver';
import { USER_SERVICE_TOKEN } from './applications/services/UserServiceInterface';
import CreateUserUseCase from './applications/use-cases/CreateUserUseCase';
import GetUsersUseCase from './applications/use-cases/GetUsersUseCase';
import UserEntity from './domain/entities/UserEntity';
import { USER_REPOSITORY_TOKEN } from './domain/repositories/UserRepositoryInterface';
import UserRepository from './infrastructure/repositories/UserRepository';
import UserService from './infrastructure/services/UserService';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    { provide: USER_SERVICE_TOKEN, useClass: UserService },
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
    GetUsersUseCase,
    UserResolver,
    CreateUserUseCase
  ],
  controllers: [UserController]
})
export default class UserModule {}
