import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import Application from '../config/Application';
import MySql from '../config/MySql';

export class DatabaseFactory {
  constructor(private configService: ConfigService) {}

  /**
   * Get MySQL factory
   */
  public getMySqlFactory(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const applicationConfig = Application.getInstance();
    const nodeEnv = this.configService.get<string>(applicationConfig.getNodeEnvProp());

    const mySqlConfig = MySql.getInstance();
    const host = this.configService.get<string>(mySqlConfig.getHostProp());
    const port = this.configService.get<number>(mySqlConfig.getPortProp());
    const username = this.configService.get<string>(mySqlConfig.getUsernameProp());
    const password = this.configService.get<string>(mySqlConfig.getPasswordProp());
    const database = this.configService.get<string>(mySqlConfig.getDatabaseNameProp());

    return {
      type: 'mysql',
      host,
      port,
      username,
      password,
      database,
      entities: [__dirname + '/**/*/entities/*{.ts,.js}'],
      logging: nodeEnv !== 'production' ? ['error', 'query'] : ['error'],
      synchronize: nodeEnv !== 'production',
      autoLoadEntities: true,
      timezone: '+00:00',
      charset: 'utf8mb4_unicode_ci'
    };
  }
}
