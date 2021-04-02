import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import AppModule from '../../../AppModule';
import PrismaService from '../../../../test_helpers/services/PrismaService';
import TestHelpersModule from '../../../../test_helpers/TestHelpersModule';

describe('PrismaService', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestHelpersModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get(PrismaService);
  });

  describe('onModuleInit', () => {
    it('should be connect', async () => {
      const $connectSpy = jest.spyOn(prismaService, '$connect');

      await app.init();
      await app.close();

      expect($connectSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onModuleDestroy', () => {
    it('should be disconnect', async () => {
      const $disconnectSpy = jest.spyOn(prismaService, '$disconnect');

      await app.init();
      await app.close();

      expect($disconnectSpy).toHaveBeenCalledTimes(1);
    });
  });
});
