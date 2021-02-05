import { ThunkAction } from 'redux-thunk';

import UserEntity from '../domain/entities/user/UserEntity';
import { UsersActionTypes } from '../views/redux/actions/UsersAction';

declare global {
  export type GetManyUserQueries = LimitQuery & OffsetQuery & KeywordQuery;

  export type UserListItem = Pick<UserEntity, 'id' | 'name' | 'age'>;

  export interface GetManyUsersResponse {
    users: UserListItem[];
  }

  export interface UsersState {
    list: UserListItem[];
    total: number;
  }

  export type FetchUsersThunk = ThunkAction<
    Promise<CustomAction<UsersActionTypes, UsersState>>,
    RootState,
    any,
    CustomAction<UsersActionTypes, UsersState>
  >;

  export interface CreateUserResponse {
    user: UserListItem;
  }

  export type CreateUserInput = Pick<UserEntity, 'name' | 'age'>;
}

export {};