import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ApplicationConfig from './infrastructure/configs/ApplicationConfig';
import { getEnvFilePath } from './infrastructure/configs/config-utils';
import MySqlConfig from './infrastructure/configs/MySqlConfig';
import Database from './infrastructure/database/Database';
import RenderModule from './infrastructure/modules/render/RenderModule';
import UserModule from './infrastructure/modules/UserModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: [ApplicationConfig.getConfig, MySqlConfig.getConfig]
    }),
    Database,
    RenderModule.forRootAsync(),
    UserModule
  ]
})
export default class AppModule {}
