import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, Like, Repository } from 'typeorm';

import UserEntity from '../../domain/entities/UserEntity';
import CreateUserInput from '../../domain/graphql/CreateUserInput';
import GetUsersArgs from '../../domain/graphql/GetUsersArgs';
import UserRepositoryInterface from '../../domain/repositories/UserRepositoryInterface';

@Injectable()
export default class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  public createEntity(value: CreateUserInput): UserEntity {
    return this.userRepository.create(value);
  }

  public async save(entity: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(entity);
  }

  public async getUsers({ limit, offset, name }: GetUsersArgs): Promise<UserEntity[]> {
    const options: FindManyOptions<UserEntity> = { where: [] };
    const whereConditions: FindConditions<UserEntity>[] = [];

    if (typeof limit !== 'undefined') {
      options.take = limit;
    }

    if (typeof offset !== 'undefined') {
      options.skip = offset;
    }

    if (typeof name !== 'undefined') {
      whereConditions.push({ name: Like(`%${name}%`) });
    }

    options.where = whereConditions;

    return this.userRepository.find({
      ...options,
      cache: true
    });
  }
}
