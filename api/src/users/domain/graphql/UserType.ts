import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class UserType {
  @Field(() => Int)
  public id!: number;

  @Field(() => String)
  public name!: string;

  @Field(() => Int)
  public age!: number;

  @Field(() => Date, { nullable: true })
  public createdAt!: Date;

  @Field(() => Date, { nullable: true })
  public updatedAt!: Date;
}
