import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { CommonColumnOptions, CommonColumns, TableNames, UserColumns } from './constants';

@Entity({ name: TableNames.USER })
export default class UserEntity {
  @PrimaryGeneratedColumn({ name: CommonColumns.ID })
  public readonly id!: number;

  @Column({ ...CommonColumnOptions, name: UserColumns.NAME, type: 'varchar' })
  public name!: string;

  @Column({ name: UserColumns.AGE })
  public age!: number;

  @CreateDateColumn()
  public readonly createdAt!: Date | null;

  @UpdateDateColumn()
  public readonly updatedAt!: Date | null;
}
