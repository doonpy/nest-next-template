import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as fs from 'fs';

const ENV_ROOT_PATH = './env/api';
const PROD_DIR = 'prod';
const DEV_DIR = 'dev';

@Module({})
export default class ConfigModule {
  private static getEnvFilePaths(): string[] {
    let rootDir = `${ENV_ROOT_PATH}/${DEV_DIR}`;
    if (process.env.NODE_ENV === 'production') {
      rootDir = `${ENV_ROOT_PATH}/${PROD_DIR}`;
    }

    return fs.readdirSync(rootDir).map((file) => `${rootDir}/${file}`);
  }

  public static forRoot(): DynamicModule {
    return NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ConfigModule.getEnvFilePaths()
    });
  }
}
