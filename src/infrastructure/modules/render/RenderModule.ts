import { DynamicModule, Module } from '@nestjs/common';
import { ApplicationConfig, HttpAdapterHost } from '@nestjs/core';
import Server from 'next';

import { RenderFilter } from './RenderFilter';
import { RenderService } from './RenderService';

const CLIENT_ROOT_PATH = './src/views';

@Module({
  providers: [RenderService]
})
export default class RenderModule {
  /**
   * Registers this module with a Next app at the root of the Nest app.
   */
  public static async forRootAsync(): Promise<DynamicModule> {
    const next = Server({ dev: process.env.NODE_ENV !== 'production', dir: CLIENT_ROOT_PATH });
    if (typeof next.prepare === 'function') {
      await next.prepare();
    }

    return {
      exports: [RenderService],
      module: RenderModule,
      providers: [
        {
          inject: [HttpAdapterHost],
          provide: RenderService,
          useFactory: (nestHost: HttpAdapterHost): RenderService => {
            return RenderService.init(
              {},
              next.getRequestHandler(),
              next.render.bind(next),
              next.renderError.bind(next),
              nestHost.httpAdapter
            );
          }
        },
        {
          inject: [ApplicationConfig, RenderService],
          provide: RenderFilter,
          useFactory: (nestConfig: ApplicationConfig, service: RenderService) => {
            const filter = new RenderFilter(service);
            nestConfig.addGlobalFilter(filter);

            return filter;
          }
        }
      ]
    };
  }
}
