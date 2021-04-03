import { Global, Module } from '@nestjs/common';

import CommonModule from '../src/common/CommonModule';
import PrismaService from './services/PrismaService';

@Global()
@Module({
  imports: [CommonModule],
  providers: [PrismaService],
  exports: [PrismaService]
})
export default class TestHelpersModule {}
