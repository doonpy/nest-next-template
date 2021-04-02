import { Prisma } from '../../../../prisma/generated/client';
import User from '../../domain/entities/User';
import { GetUsersParams } from '../../domain/repositories/UserRepositoryInterface';

export const USER_SERVICE_TOKEN = Symbol('UserServiceInterface');

export default interface UserServiceInterface {
  /**
   * Create a user
   */
  create(data: Prisma.UserCreateInput): Promise<User>;

  /**
   * Get many users
   */
  getUsers(params: GetUsersParams): Promise<User[]>;
}
