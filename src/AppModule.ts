import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import Application from './infrastructure/config/Application';
import { getEnvFilePath } from './infrastructure/config/config-utils';
import MySql from './infrastructure/config/MySql';
import Database from './infrastructure/database/Database';
import RenderModule from './infrastructure/modules/render/RenderModule';
import UserModule from './infrastructure/modules/UserModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: [Application.getConfig, MySql.getConfig]
    }),
    Database,
    RenderModule.forRootAsync(),
    UserModule
  ]
})
export default class AppModule {}
