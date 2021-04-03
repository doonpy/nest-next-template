import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import AppModule from './AppModule';

(async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const origins = process.env.CORS_ALLOW_ORIGINS.split(';').map((origin) => new RegExp(origin));
    app.enableCors({
      origin: origins,
      optionsSuccessStatus: 200
    });
    await app.listen(parseInt(process.env.PORT || ''));
  } catch (error) {
    throw new Error(error);
  }
})();
