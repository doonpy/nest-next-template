import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import AppModule from './AppModule';
import Application from './infrastructure/config/Application';

const enableCors = (app: NestExpressApplication) => {
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>(Application.getInstance().getNodeEnvProp());
  if (nodeEnv === 'production') {
    app.enableCors({
      origin: [/^http:\/\/localhost:3000$/],
      optionsSuccessStatus: 200
    });
  } else {
    app.enableCors();
  }
};

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  enableCors(app);
  await app.listen(3000);
})();
