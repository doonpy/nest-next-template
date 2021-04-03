import { Test, TestingModule } from '@nestjs/testing';

import TestHelpersModule from '../../../../../test_helpers/TestHelpersModule';
import CommonModule from '../../../../common/CommonModule';
import ValidationService from '../../../../common/services/ValidationService';
import User from '../../../domain/entities/User';
import GetUsersArgs from '../../../domain/graphql/GetUsersArgs';
import UserModule from '../../../UserModule';
import UserServiceInterface, { USER_SERVICE_TOKEN } from '../../services/UserServiceInterface';
import GetUsersUseCase from '../GetUsersUseCase';

describe('GetUsersUseCase', () => {
  let moduleRef: TestingModule;
  let getUsersUseCase: GetUsersUseCase;
  let validationService: ValidationService;
  let userService: UserServiceInterface;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [CommonModule, UserModule, TestHelpersModule]
    }).compile();

    validationService = moduleRef.get<ValidationService>(ValidationService);
    userService = moduleRef.get<UserServiceInterface>(USER_SERVICE_TOKEN);
    getUsersUseCase = moduleRef.get<GetUsersUseCase>(GetUsersUseCase);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('process', () => {
    const args: GetUsersArgs = { limit: 1, offset: 2, name: 'foo' };

    it('should validate create user input', async () => {
      const spyValidate = jest.spyOn(validationService, 'validate');

      await getUsersUseCase.process(args);

      expect(spyValidate).toHaveBeenCalledWith(args, GetUsersArgs);
    });

    it('should called getUsers of UserService', async () => {
      const spyGetUsers = jest.spyOn(userService, 'getUsers');

      await getUsersUseCase.process(args);

      expect(spyGetUsers).toHaveBeenCalledWith({
        skip: args.offset,
        take: args.limit,
        where: { name: { contains: args.name } }
      });
    });

    it('should return the users which correct type', async () => {
      const expectedUsers: User[] = [
        new User({ id: 1, name: 'foo', age: 2, createdAt: new Date(), updatedAt: new Date() }),
        new User({ id: 2, name: 'bar', age: 5, createdAt: new Date(), updatedAt: new Date() }),
        new User({ id: 3, name: 'baz', age: 10, createdAt: new Date(), updatedAt: new Date() }),
        new User({ id: 4, name: 'xay', age: 20, createdAt: new Date(), updatedAt: new Date() }),
        new User({ id: 5, name: 'zed', age: 25, createdAt: new Date(), updatedAt: new Date() })
      ];
      jest.spyOn(userService, 'getUsers').mockReturnValue(Promise.resolve(expectedUsers));

      const result = await getUsersUseCase.process(args);

      result.forEach((user, index) => {
        expect(user).toMatchObject(expectedUsers[index].convertToGraphql());
      });
    });
  });
});
