import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import chalk from 'chalk';
import { Request, Response } from 'express';
import morgan from 'morgan';

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

const bindRequestLogger = (app: NestExpressApplication) => {
  const logFormat: morgan.FormatFn<Request, Response> = (tokens, req, res) =>
    [
      chalk.yellowBright(`[Request] - ${process.pid.toString()}`),
      tokens.date(req, res),
      chalk.magenta(`${tokens.method(req, res)}`),
      chalk.white(tokens.url(req, res)),
      chalk.white(tokens.status(req, res)),
      chalk.white(tokens.res(req, res, 'content-length')),
      `${chalk.green(`+${tokens['response-time'](req, res)}ms`)}`
    ].join(' ');
  app.use(morgan(logFormat));
};

(async () => {
  try {
    const applicationConfig = ApplicationConfig.getInstance();
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const port = parseInt(configService.get<string>(applicationConfig.getPortProp()) ?? '3000');
    const nodeEnv = configService.get<string>(applicationConfig.getNodeEnvProp()) ?? '';
    enableCors(app, nodeEnv, port);
    bindRequestLogger(app);
    await app.listen(port);
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
})();
