import { Global, Module } from '@nestjs/common';

import PrismaService from './services/PrismaService';
import ValidationService from './services/ValidationService';

@Global()
@Module({
  providers: [ValidationService, PrismaService],
  exports: [ValidationService, PrismaService]
})
export default class CommonModule {}
