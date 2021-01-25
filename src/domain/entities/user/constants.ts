import { ColumnOptions } from 'typeorm';

export const CommonColumnOptions: ColumnOptions = {
  charset: 'utf8mb4',
  collation: 'utf8mb4_general_ci'
};

export const TableNames = {
  USER: 'user'
};

export const CommonColumns = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at'
};

export const UserColumns = {
  NAME: 'name',
  AGE: 'age'
};
