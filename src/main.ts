import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import AppModule from './AppModule';
import ApplicationConfig from './infrastructure/configs/ApplicationConfig';

const enableCors = (app: NestExpressApplication, nodeEnv: string, port: number) => {
  if (nodeEnv === 'production') {
    app.enableCors({
      origin: [new RegExp(`^http://localhost:${port}$/`)],
      optionsSuccessStatus: 200
    });
  } else {
    app.enableCors();
  }
};

(async () => {
  try {
    const applicationConfig = ApplicationConfig.getInstance();
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const port = parseInt(configService.get<string>(applicationConfig.getPortProp()) ?? '3000');
    const nodeEnv = configService.get<string>(applicationConfig.getNodeEnvProp()) ?? '';
    enableCors(app, nodeEnv, port);
    await app.listen(port);
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
})();
