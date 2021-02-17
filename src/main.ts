import { InternalServerErrorException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import chalk from 'chalk';
import { Request, Response } from 'express';
import morgan from 'morgan';

import AppModule from './AppModule';

const enableCors = (app: NestExpressApplication) => {
  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: [new RegExp(`^http://localhost:${process.env.PORT}$/`)],
      optionsSuccessStatus: 200
    });
  } else {
    app.enableCors();
  }
};

const bindRequestLogger = (app: NestExpressApplication) => {
  const logFormat: morgan.FormatFn<Request, Response> = (tokens, req, res) =>
    [
      chalk.yellowBright(`[Request] - ${process.pid.toString()}`),
      tokens.date(req, res),
      chalk.magenta(`${tokens.method(req, res)}`),
      chalk.white(tokens.url(req, res)),
      chalk.blueBright(tokens.status(req, res)),
      chalk.green(`+${tokens['response-time'](req, res)}ms`)
    ].join(' ');
  app.use(morgan(logFormat));
};

(async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    enableCors(app);
    bindRequestLogger(app);
    await app.listen(parseInt(process.env.PORT || ''));
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
})();
