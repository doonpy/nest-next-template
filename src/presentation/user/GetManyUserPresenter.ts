import UserEntity from '../../domain/entities/user/UserEntity';
import ResponsePresenter from '../ResponsePresenter';

export default class GetManyUserPresenter extends ResponsePresenter {
  constructor(private readonly users: UserEntity[]) {
    super();
  }

  public getPresent(): GetManyUsers {
    const users = this.users.map((user) => ({
      id: user.id,
      name: user.name,
      age: user.age
    }));

    return { statusCode: this.getStatusCode(), users };
  }
}
