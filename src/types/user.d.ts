import UserEntity from '../domain/entities/user/UserEntity';

declare global {
  export interface CreateUser {
    name: string;
    age: number;
  }

  export type GetManyUserQueries = LimitQuery & OffsetQuery & KeywordQuery;

  export interface GetManyUsers extends CommonResponse {
    users: Pick<UserEntity, 'id' | 'name' | 'age'>[];
  }
}

export {};
