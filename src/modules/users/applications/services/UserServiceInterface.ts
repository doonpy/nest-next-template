import CreateUserInput from '../../domain/graphql/CreateUserInput';
import GetUsersArgs from '../../domain/graphql/GetUsersArgs';
import User from '../../domain/models/User';

export const USER_SERVICE_TOKEN = Symbol('UserServiceInterface');

export default interface UserServiceInterface {
  create(value: CreateUserInput): Promise<User>;

  getUsers(args: GetUsersArgs): Promise<User[]>;
}
