import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

import NotStringException from '../../../common/exceptions/NotStringException';
import GetManyArgs from '../../../common/graphql/GetManyArgs';

@ArgsType()
export default class GetUsersArgs extends GetManyArgs {
  @Field(() => String, { nullable: true })
  @IsString({ message: new NotStringException().getMessage() })
  public name?: string;
}
