import { Prisma, User } from '@prisma/client';

export const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY_TOKEN');

export interface GetUsersParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByInput;
}

export default interface UserRepositoryInterface {
  /**
   * Add a user to database
   */
  create(data: Prisma.UserCreateInput): Promise<User>;

  /**
   * Get many users
   */
  getUsers(params: GetUsersParams): Promise<User[]>;
}
