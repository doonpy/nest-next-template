import { Test, TestingModule } from '@nestjs/testing';

import TestHelpersModule from '../../../../../test_helpers/TestHelpersModule';
import CreateUserInput from '../../../domain/graphql/CreateUserInput';
import GetUsersArgs from '../../../domain/graphql/GetUsersArgs';
import UserModule from '../../../UserModule';
import CreateUserUseCase from '../../use-cases/CreateUserUseCase';
import GetUsersUseCase from '../../use-cases/GetUsersUseCase';
import UserResolver from '../UserResolver';

describe('UserResolver', () => {
  let moduleRef: TestingModule;
  let getUsersUseCase: GetUsersUseCase;
  let createUserUseCase: CreateUserUseCase;
  let userResolver: UserResolver;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [TestHelpersModule, UserModule]
    }).compile();

    getUsersUseCase = moduleRef.get<GetUsersUseCase>(GetUsersUseCase);
    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
    userResolver = moduleRef.get<UserResolver>(UserResolver);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('users', () => {
    it('should call process of GetUsersUseCase', async () => {
      const args: GetUsersArgs = { limit: 1, offset: 2, name: 'foo' };
      const spyProcess = jest.spyOn(getUsersUseCase, 'process');

      await userResolver.users(args);

      expect(spyProcess).toHaveBeenCalledWith(args);
    });
  });

  describe('createUser', () => {
    it('should call process of CreateUserUseCase', async () => {
      const input: CreateUserInput = { name: 'foo', age: 1 };
      const spyProcess = jest.spyOn(createUserUseCase, 'process');

      await userResolver.createUser(input);

      expect(spyProcess).toHaveBeenCalledWith(input);
    });
  });
});
