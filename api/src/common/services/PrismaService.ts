import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * Create connect when common module initialize
   */
  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  /**
   * Disconnect when common module destroyed.
   */
  public async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
