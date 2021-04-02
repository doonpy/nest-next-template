import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import fs from 'fs';
import path from 'path';

const ENV_ROOT_PATH = 'env';
const PROD_DIR = 'prod';
const DEV_DIR = 'dev';

@Module({})
export default class ConfigModule {
  /**
   * Get environment file paths in env directory
   */
  public static getEnvFilePaths(): string[] {
    const root = process.cwd().includes('api') ? process.cwd() : path.join(process.cwd(), 'api'); // For e2e testing
    let rootDir = path.join(root, ENV_ROOT_PATH, DEV_DIR);
    if (process.env.NODE_ENV === 'production') {
      rootDir = path.join(root, ENV_ROOT_PATH, PROD_DIR);
    }

    return fs.readdirSync(rootDir).map((file) => path.join(rootDir, file));
  }

  /**
   * Initialize module
   */
  public static forRoot(): DynamicModule {
    return NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ConfigModule.getEnvFilePaths()
    });
  }
}
