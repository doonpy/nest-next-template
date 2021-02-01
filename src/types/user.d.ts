import { ThunkAction } from 'redux-thunk';

import UserEntity from '../domain/entities/user/UserEntity';
import { UsersActionTypes } from '../views/redux/actions/UsersAction';

declare global {
  export interface CreateUser {
    name: string;
    age: number;
  }

  export type GetManyUserQueries = LimitQuery & OffsetQuery & KeywordQuery;

  export type GetManyUsersItem = Pick<UserEntity, 'id' | 'name' | 'age'>;

  export interface GetManyUsers extends CommonResponse {
    users: GetManyUsersItem[];
  }

  export interface UsersState {
    list: GetManyUsersItem[];
    total: number;
  }

  export type FetchUsersThunk = ThunkAction<
    Promise<CustomAction<UsersActionTypes, UsersState>>,
    RootState,
    any,
    CustomAction<UsersActionTypes, UsersState>
  >;
}

export {};
