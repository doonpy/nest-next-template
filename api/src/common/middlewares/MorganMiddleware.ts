import chalk from 'chalk';
import { Handler, Request, Response } from 'express';
import morgan from 'morgan';

export default class MorganMiddleware {
  /**
   * Get log format
   */
  private getFormat(): morgan.FormatFn<Request, Response> {
    return (tokens, req, res) =>
      [
        chalk.yellowBright(`[Request] - ${process.pid.toString()}`),
        tokens.date(req, res),
        chalk.magenta(`${tokens.method(req, res)}`),
        chalk.white(tokens.url(req, res)),
        chalk.blueBright(tokens.status(req, res)),
        chalk.green(`+${tokens['response-time'](req, res)}ms`)
      ].join(' ');
  }

  /**
   * Get morgan middleware
   */
  public getMiddleware(): Handler {
    return morgan(this.getFormat.call(this));
  }
}
