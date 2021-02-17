import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { parse as parseUrl } from 'url';

import RenderService from './RenderService';

@Catch()
export default class RenderFilter implements ExceptionFilter {
  private readonly service: RenderService;

  constructor(service: RenderService) {
    this.service = service;
  }

  public async catch(err: any, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    if (!response || !request) {
      return;
    }

    const { pathname, query } = parseUrl(request.url, true);
    response.statusCode = err && err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR;

    if (this.service.isApiUrl(pathname)) {
      return this.service.handleApiException(err, response);
    }

    const requestHandler = this.service.getRequestHandler();
    const errorRenderer = this.service.getErrorRenderer();
    if (!response.headersSent && request.url) {
      // check to see if the URL requested is an internal nextjs route
      // if internal, the url is to some asset (ex /_next/*) that needs to be rendered by nextjs
      if (this.isInternalUrl(request.url)) {
        return requestHandler(request, response);
      }

      if (response.headersSent) {
        return;
      }

      const serializedErr = this.serializeError(err);
      if (response.statusCode === HttpStatus.NOT_FOUND) {
        return errorRenderer(null, request, response, pathname, {
          ...query,
          [Symbol.for('Error')]: serializedErr
        });
      }

      return errorRenderer(serializedErr, request, response, pathname, query);
    }

    throw new InternalServerErrorException(err);
  }

  /**
   * Serialize the error similarly to method used in Next -- parse error as Nest error type
   */
  public serializeError(err: any): ErrorResponse {
    const out: ErrorResponse = {};

    if (!err) {
      return out;
    }

    if (err.stack && process.env.NODE_ENV !== 'production') {
      out.stack = err.stack;
    }

    if (err.response && typeof err.response === 'object') {
      const { statusCode, error, message } = err.response;
      out.statusCode = statusCode;
      out.name = error;
      out.message = message;
    } else if (err.message && typeof err.message === 'object') {
      const { statusCode, error, message } = err.message;
      out.statusCode = statusCode;
      out.name = error;
      out.message = message;
    }

    if (!out.statusCode && err.status) {
      out.statusCode = err.status;
    }

    if (!out.message && err.message) {
      out.message = err.message;
    }

    return out;
  }

  /**
   * Check if the URL is internal to NextJS
   */
  private isInternalUrl(url: string): boolean {
    const internalPrefixes = [/^\/_next\//, /^\/static\//];

    return internalPrefixes.some((prefix) => prefix.test(url));
  }
}
