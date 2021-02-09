import { Injectable } from '@nestjs/common';

import UserEntity from '../domain/entities/user/UserEntity';

@Injectable()
export default class UserListItemConverter {
  public convert(user: UserEntity): UserListItem {
    return {
      id: user.id,
      name: user.name,
      age: user.age
    };
  }
}
