import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import MorganMiddleware from './middlewares/MorganMiddleware';
import PrismaService from './services/PrismaService';
import ValidationService from './services/ValidationService';

@Global()
@Module({
  providers: [ValidationService, PrismaService],
  exports: [ValidationService, PrismaService]
})
export default class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    const morganMiddleware = new MorganMiddleware();

    consumer.apply(morganMiddleware.getMiddleware.call(morganMiddleware)).forRoutes('*');
  }
}
