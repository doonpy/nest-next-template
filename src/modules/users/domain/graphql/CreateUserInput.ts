import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString, Min } from 'class-validator';

import MinException from '../../../common/exceptions/MinException';
import NotIntegerException from '../../../common/exceptions/NotIntegerException';
import NotStringException from '../../../common/exceptions/NotStringException';

@InputType()
export default class CreateUserInput {
  @Field(() => String)
  @IsString({ message: new NotStringException().getMessage })
  public name!: string;

  @Field(() => Int)
  @IsInt({ message: new NotIntegerException().getMessage() })
  @Min(0, { message: new MinException(0).getMessage })
  public age!: number;
}
