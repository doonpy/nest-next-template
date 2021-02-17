import { Module } from '@nestjs/common';

import CommonModule from './modules/common/CommonModule';
import ConfigModule from './modules/configs/ConfigModule';
import GraphQLModule from './modules/graphql/GraphQLModule';
import MysqlModule from './modules/mysql/MysqlModule';
import RenderModule from './modules/render/RenderModule';
import UserModule from './modules/users/UserModule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MysqlModule,
    GraphQLModule.forRoot(),
    RenderModule.forRootAsync(),
    CommonModule,
    UserModule
  ]
})
export default class AppModule {}
