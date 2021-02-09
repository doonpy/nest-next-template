import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import ApplicationConfig from '../configs/ApplicationConfig';
import MySqlConfig from '../configs/MySqlConfig';

enum ConnectionType {
  CONFIG,
  HEROKU
}

export class MySqlFactory {
  constructor(private configService: ConfigService) {}

  private getConnection(type: ConnectionType): Partial<MysqlConnectionOptions> {
    const mySqlConfig = MySqlConfig.getInstance();
    switch (type) {
      case ConnectionType.CONFIG:
        const host = this.configService.get<string>(mySqlConfig.getHostProp());
        const port = this.configService.get<number>(mySqlConfig.getPortProp());
        const username = this.configService.get<string>(mySqlConfig.getUsernameProp());
        const password = this.configService.get<string>(mySqlConfig.getPasswordProp());
        const database = this.configService.get<string>(mySqlConfig.getDatabaseNameProp());

        return {
          host,
          port,
          username,
          password,
          database
        };

      case ConnectionType.HEROKU:
        return {
          url: this.configService.get<string>(mySqlConfig.getUrlProp())
        };
      default:
        return {};
    }
  }

  /**
   * Get MySQL factory
   */
  public getFactory(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const applicationConfig = ApplicationConfig.getInstance();
    const nodeEnv = this.configService.get<string>(applicationConfig.getNodeEnvProp());
    const mySqlConfig = MySqlConfig.getInstance();
    const connectionType = parseInt(
      this.configService.get<string>(mySqlConfig.getConnectionTypeProp()) || '0'
    ) as ConnectionType;

    return {
      ...this.getConnection(connectionType),
      type: 'mysql',
      entities: [__dirname + '/**/*/entities/*{.ts,.js}'],
      logging: nodeEnv !== 'production' ? ['error', 'query'] : ['error'],
      synchronize: true,
      autoLoadEntities: true,
      timezone: '+00:00',
      charset: 'utf8mb4_unicode_ci'
    };
  }
}
