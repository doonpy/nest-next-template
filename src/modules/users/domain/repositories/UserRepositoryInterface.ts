import UserEntity from '../entities/UserEntity';
import CreateUserInput from '../graphql/CreateUserInput';
import GetUsersArgs from '../graphql/GetUsersArgs';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';

export default interface UserRepositoryInterface {
  createEntity(value: CreateUserInput): UserEntity;

  save(entity: UserEntity): Promise<UserEntity>;

  getUsers({ limit, offset, name }: GetUsersArgs): Promise<UserEntity[]>;
}
