import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export const UserColumns = {
  ID: 'id',
  NAME: 'name',
  AGE: 'age',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at'
};

@Entity({ name: 'user' })
export default class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public readonly id!: number;

  @Column({
    name: UserColumns.NAME,
    type: 'varchar',
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci'
  })
  public name!: string;

  @Column({ name: UserColumns.AGE })
  public age!: number;

  @CreateDateColumn({ name: UserColumns.CREATED_AT })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ name: UserColumns.UPDATED_AT })
  public readonly updatedAt!: Date;
}
