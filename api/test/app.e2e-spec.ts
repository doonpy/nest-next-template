import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import AppModule from '../src/AppModule';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
});