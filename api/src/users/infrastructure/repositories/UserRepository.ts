import { Injectable } from '@nestjs/common';

import { Prisma, User } from '../../../../prisma/generated/client';
import PrismaService from '../../../common/services/PrismaService';
import UserRepositoryInterface, {
  GetUsersParams
} from '../../domain/repositories/UserRepositoryInterface';

@Injectable()
export default class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  /** @inheritDoc */
  public async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  /** @inheritDoc */
  public async getUsers({ take, skip, cursor, where, orderBy }: GetUsersParams): Promise<User[]> {
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }
}
