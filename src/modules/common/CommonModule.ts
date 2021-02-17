import { Global, Module } from '@nestjs/common';

import ValidationService from './services/ValidationService';

@Global()
@Module({
  providers: [ValidationService],
  exports: [ValidationService]
})
export default class CommonModule {}
