import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

import MaxException from '../exceptions/MaxException';
import MinException from '../exceptions/MinException';
import NotIntegerException from '../exceptions/NotIntegerException';

@ArgsType()
export default class GetManyArgs {
  @Field(() => Int, { nullable: true })
  @IsInt({ message: new NotIntegerException().getMessage() })
  @Min(1, { message: new MinException(1).getMessage() })
  @Max(20, { message: new MaxException(20).getMessage() })
  public limit?: number;

  @Field(() => Int, { nullable: true })
  @IsInt({ message: new NotIntegerException().getMessage() })
  @Min(0, { message: new MinException(0).getMessage() })
  public offset?: number;
}
