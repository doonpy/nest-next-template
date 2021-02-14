import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ApplicationConfig from './infrastructure/configs/ApplicationConfig';
import { getEnvFilePath } from './infrastructure/configs/config-utils';
import MySqlConfig from './infrastructure/configs/MySqlConfig';
import DatabaseModule from './infrastructure/database/DatabaseModule';
import RenderModule from './infrastructure/modules/render/RenderModule';
import UserModule from './infrastructure/modules/UserModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: [ApplicationConfig.getConfig, MySqlConfig.getConfig]
    }),
    DatabaseModule,
    RenderModule.forRootAsync(),
    UserModule
  ]
})
export default class AppModule {}
