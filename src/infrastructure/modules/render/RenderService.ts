import { HttpServer, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import Server from 'next/dist/next-server/server/next-server';

import { API_PATH_PREFIX } from '../../../application/controllers/constant';

@Injectable()
export default class RenderService {
  private static instance: RenderService;
  private nextServer!: Server;
  private httpServer!: HttpServer;

  public static getInstance(): RenderService {
    if (!this.instance) {
      this.instance = new RenderService();
    }

    return this.instance;
  }

  public setNextServer(server: Server): void {
    this.nextServer = server;
  }

  public setHttpServer(server: HttpServer): void {
    this.httpServer = server;
  }

  public getRequestHandler(): RequestHandler {
    return this.nextServer.getRequestHandler();
  }

  public getErrorRenderer(): ErrorRenderer {
    return this.nextServer.renderError.bind(this.nextServer);
  }

  public async render<Data extends Record<string, any>>(req: Request, res: Response, data?: Data) {
    return this.nextServer.render(req, res, req.path, data);
  }

  public isApiUrl(url: string | null): boolean {
    if (!url) {
      return false;
    }

    return new RegExp(`^/${API_PATH_PREFIX}`).test(url);
  }

  public handleApiException(error: any, response: Response): void {
    response.status(HttpStatus.OK).json(error.response);
  }
}
