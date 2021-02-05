import UserEntity from '../domain/entities/user/UserEntity';

export default class UserListItemConverter {
  constructor(private readonly user: UserEntity) {}

  public convert(): UserListItem {
    return {
      id: this.user.id,
      name: this.user.name,
      age: this.user.age
    };
  }
}
