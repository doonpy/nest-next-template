import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';

import UserEntity from '../../domain/entities/user/UserEntity';
import GetManyUserQueriesModel from '../../domain/models/user/GetManyUserQueriesModel';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  public createEntity(value: CreateUserInput): UserEntity {
    return this.userRepository.create(value);
  }

  public async save(entity: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(entity);
  }

  public async getMany(queryModel: GetManyUserQueriesModel): Promise<UserEntity[]> {
    const limit = queryModel.getLimit();
    const offset = queryModel.getOffset();
    const keyword = queryModel.getKeyword();
    const options: FindManyOptions<UserEntity> = {};

    if (typeof limit !== 'undefined') {
      options.take = limit;
    }

    if (typeof offset !== 'undefined') {
      options.skip = offset;
    }

    if (typeof keyword !== 'undefined') {
      options.where = { name: Like(`%${keyword}%`) };
    }

    return this.userRepository.find({
      ...options,
      cache: true
    });
  }
}
