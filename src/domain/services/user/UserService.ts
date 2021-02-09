import { Injectable } from '@nestjs/common';

import UserListItemConverter from '../../../converter/UserListItemConverter';
import UserRepository from '../../../infrastructure/repository/UserRepository';
import UserEntity from '../../entities/user/UserEntity';
import GetManyUserQueriesModel from '../../models/user/GetManyUserQueriesModel';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userListItemConverter: UserListItemConverter
  ) {}

  public async create(value: CreateUserInput): Promise<UserListItem> {
    const entity = this.userRepository.createEntity(value);
    const createdUser = await this.userRepository.save(entity);

    return this.userListItemConverter.convert(createdUser);
  }

  public async getMany(queryModel: GetManyUserQueriesModel): Promise<UserEntity[]> {
    return this.userRepository.getMany(queryModel);
  }
}
