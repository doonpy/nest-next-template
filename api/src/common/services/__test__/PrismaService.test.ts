import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import PrismaService from '../../../../test_helpers/services/PrismaService';
import TestHelpersModule from '../../../../test_helpers/TestHelpersModule';
import AppModule from '../../../AppModule';

describe('PrismaService', () => {
  let moduleRef: TestingModule;
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule, TestHelpersModule]
    }).compile();

    app = moduleRef.createNestApplication();
    prismaService = app.get(PrismaService);
  });

  afterAll(async () => {
    await moduleRef.close();
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
