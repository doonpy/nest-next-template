import { Test, TestingModule } from '@nestjs/testing';

import TestHelpersModule from '../../../../../test_helpers/TestHelpersModule';
import CommonModule from '../../../../common/CommonModule';
import ValidationService from '../../../../common/services/ValidationService';
import User from '../../../domain/entities/User';
import CreateUserInput from '../../../domain/graphql/CreateUserInput';
import UserModule from '../../../UserModule';
import UserServiceInterface, { USER_SERVICE_TOKEN } from '../../services/UserServiceInterface';
import CreateUserUseCase from '../CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let moduleRef: TestingModule;
  let createUserUseCase: CreateUserUseCase;
  let validationService: ValidationService;
  let userService: UserServiceInterface;
  const userData: CreateUserInput = { name: 'foo', age: 1 };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [CommonModule, UserModule, TestHelpersModule]
    }).compile();

    validationService = moduleRef.get<ValidationService>(ValidationService);
    userService = moduleRef.get<UserServiceInterface>(USER_SERVICE_TOKEN);
    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('process', () => {
    it('should validate create user input', async () => {
      const spyValidate = jest.spyOn(validationService, 'validate');

      await createUserUseCase.process(userData);

      expect(spyValidate).toHaveBeenCalledWith(userData, CreateUserInput);
    });

    it('should create user with user service', async () => {
      const spyCreate = jest.spyOn(userService, 'create');

      await createUserUseCase.process(userData);

      expect(spyCreate).toHaveBeenCalledWith(userData);
    });

    it('should return created user which correctly type', async () => {
      const user = new User({
        id: 1,
        name: 'foo',
        age: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      jest.spyOn(userService, 'create').mockReturnValue(Promise.resolve(user));

      const createdUser = await createUserUseCase.process(userData);

      expect(createdUser).toMatchObject(user.convertToGraphql());
    });
  });
});
