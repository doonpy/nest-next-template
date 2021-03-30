import { Module } from '@nestjs/common';

import CommonModule from './common/CommonModule';
import ConfigModule from './configs/ConfigModule';
import GraphQLModule from './graphql/GraphQLModule';
import UserModule from './users/UserModule';

@Module({
  imports: [ConfigModule.forRoot(), GraphQLModule.forRoot(), CommonModule, UserModule]
})
export default class AppModule {}
