import { Injectable } from '@nestjs/common';

import UserRepository from '../../../infrastructure/repository/UserRepository';
import UserEntity from '../../entities/user/UserEntity';
import GetManyUserQueriesModel from '../../models/user/GetManyUserQueriesModel';

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(value: CreateUser): Promise<UserEntity> {
    const entity = this.userRepository.createEntity(value);

    return this.userRepository.save(entity);
  }

  public async getMany(queryModel: GetManyUserQueriesModel): Promise<UserEntity[]> {
    return this.userRepository.getMany(queryModel);
  }
}
