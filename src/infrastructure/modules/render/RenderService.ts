import { HttpServer, InternalServerErrorException } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';

import { isInternalUrl } from './next-utils';
import {
  ErrorHandler,
  ErrorRenderer,
  RenderableResponse,
  Renderer,
  RendererConfig,
  RequestHandler
} from './types';

export class RenderService {
  public static init(
    config: Partial<RendererConfig>,
    handler: RequestHandler,
    renderer: Renderer,
    errorRenderer: ErrorRenderer,
    server: HttpServer
  ): RenderService {
    const self = new RenderService();
    self.mergeConfig(config);
    self.setRequestHandler(handler);
    self.setRenderer(renderer);
    self.setErrorRenderer(errorRenderer);
    self.bindHttpServer(server);

    return self;
  }

  private initialized = false;
  private requestHandler?: RequestHandler;
  private renderer?: Renderer;
  private errorRenderer?: ErrorRenderer;
  private errorHandler?: ErrorHandler;
  private config: RendererConfig = {
    dev: process.env.NODE_ENV !== 'production',
    viewsDir: ''
  };

  /**
   * Merge the default config with the config obj passed to method
   */
  public mergeConfig(config: Partial<RendererConfig>): void {
    if (typeof config.dev === 'boolean') {
      this.config.dev = config.dev;
    }
    if (typeof config.viewsDir === 'string' || config.viewsDir === null) {
      this.config.viewsDir = config.viewsDir;
    }
  }

  /**
   * Set the directory that Next will render pages from
   */
  public setViewsDir(path: string | null): void {
    this.config.viewsDir = path;
  }

  /**
   * Get the directory that Next renders pages from
   */
  public getViewsDir(): string | null {
    return this.config.viewsDir;
  }

  /**
   * Explicitly set if env is or not dev
   */
  public setIsDev(dev: boolean): void {
    this.config.dev = dev;
  }

  /**
   * Get if the env is dev
   */
  public isDev(): boolean {
    return this.config.dev;
  }

  /**
   * Set the default request handler provided by next
   */
  public setRequestHandler(handler: RequestHandler): void {
    this.requestHandler = handler;
  }

  /**
   * Get the default request handler
   */
  public getRequestHandler(): RequestHandler | undefined {
    return this.requestHandler;
  }

  /**
   * Set the render function provided by next
   */
  public setRenderer(renderer: Renderer): void {
    this.renderer = renderer;
  }

  /**
   * Get the render function provided by next
   */
  public getRenderer(): Renderer | undefined {
    return this.renderer;
  }

  /**
   * Set nextjs error renderer
   */
  public setErrorRenderer(errorRenderer: ErrorRenderer): void {
    this.errorRenderer = errorRenderer;
  }

  /**
   * Get nextjs error renderer
   */
  public getErrorRenderer(): ErrorRenderer | undefined {
    return this.errorRenderer;
  }

  /**
   * Set a custom error handler
   */
  public setErrorHandler(handler: ErrorHandler): void {
    this.errorHandler = handler;
  }

  /**
   * Get the custom error handler
   */
  public getErrorHandler(): ErrorHandler | undefined {
    return this.errorHandler;
  }

  /**
   * Check if the URL is internal to nextjs
   */
  public isInternalUrl(url: string): boolean {
    return isInternalUrl(url);
  }

  /**
   * Check if the service has been initialized by the module
   */
  public isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Bind to the render function for the HttpServer that nest is using and override
   * it to allow for next to render the page
   */
  public bindHttpServer(server: HttpServer): void {
    if (this.initialized) {
      throw new Error('RenderService: already initialized');
    }

    this.initialized = true;
    const renderer = this.getRenderer();
    const getViewPath = this.getViewPath.bind(this);

    server.render = (response: any, view: string, data: Record<string, any>) => {
      const request: IncomingMessage = response.req;
      if (request && response && renderer) {
        return renderer(request, response, getViewPath(view), data);
      }

      if (!renderer) {
        throw new InternalServerErrorException('RenderService: renderer is not set');
      }

      if (!response) {
        throw new InternalServerErrorException('RenderService: could not get the response');
      }

      if (!request) {
        throw new InternalServerErrorException('RenderService: could not get the request');
      }

      throw new Error('RenderService: failed to render');
    };

    server.getInstance().use((req: any, res: any, next: () => any) => {
      res.render = ((view: string, data?: ParsedUrlQuery) => {
        if (!renderer) {
          throw new InternalServerErrorException('RenderService: renderer is not set');
        }

        return renderer(req, res, getViewPath(view), data);
      }) as RenderableResponse['render'];

      next();
    });
  }

  /**
   * Format the path to the view
   */
  protected getViewPath(view: string): string {
    const baseDir = this.getViewsDir();
    const basePath = baseDir ? baseDir : '';

    return `${basePath}/${view}`;
  }
}
