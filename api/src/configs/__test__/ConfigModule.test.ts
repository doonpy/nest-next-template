import { ConfigModule as NestConfigModule } from '@nestjs/config';
import path from 'path';

import ConfigModule from '../ConfigModule';

describe('ConfigModule', () => {
  describe('getEnvFilePaths', () => {
    it('should return paths in "dev" directory when process.env.NODE_ENV not is "production"', () => {
      process.env.NODE_ENV = 'development';
      const paths = ConfigModule.getEnvFilePaths();
      const expected = path.join(process.cwd(), 'api/env/dev/app.env');

      expect(paths).toContain(expected);
    });

    it('should return paths in "prod" directory when process.env.NODE_ENV is "production"', () => {
      process.env.NODE_ENV = 'production';
      const paths = ConfigModule.getEnvFilePaths();
      const expected = path.join(process.cwd(), 'api/env/prod/app.env');

      expect(paths).toContain(expected);
    });
  });

  describe('forRoot', () => {
    it('should return "ConfigModule" of @nestjs/config', () => {
      const expectedModule = NestConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ConfigModule.getEnvFilePaths()
      });
      const configModule = ConfigModule.forRoot();

      expect(Object(configModule).toString()).toEqual(Object(expectedModule).toString());
    });
  });
});
