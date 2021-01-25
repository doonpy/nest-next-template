import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserApi from '../../application/controllers/user/UserApi';
import UserView from '../../application/controllers/user/UserView';
import CreateUserUseCase from '../../application/use-cases/user/CreateUserUseCase';
import GetManyUsersUseCase from '../../application/use-cases/user/GetManyUsersUseCase';
import UserEntity from '../../domain/entities/user/UserEntity';
import UserService from '../../domain/services/user/UserService';
import CreateUserValidation from '../../domain/validations/user/CreateUserValidation';
import { GetManyUserQueriesValidation } from '../../domain/validations/user/GetManyUserQueriesValidation';
import UserRepository from '../repository/UserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserRepository,
    UserService,
    CreateUserUseCase,
    CreateUserValidation,
    GetManyUsersUseCase,
    GetManyUserQueriesValidation
  ],
  controllers: [UserApi, UserView]
})
export default class UserModule {}
