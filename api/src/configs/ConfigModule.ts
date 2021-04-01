import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import path from 'path';

const ENV_ROOT_PATH = './env';
const PROD_DIR = 'prod';
const DEV_DIR = 'dev';

@Module({})
export default class ConfigModule {
  private static getEnvFilePaths(): string[] {
    let rootDir = path.join(process.cwd(), ENV_ROOT_PATH, DEV_DIR);
    if (process.env.NODE_ENV === 'production') {
      rootDir = path.join(process.cwd(), ENV_ROOT_PATH, PROD_DIR);
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
