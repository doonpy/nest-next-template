import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../../../../../prisma/generated/test-client';
import TestHelpersModule from '../../../../../test_helpers/TestHelpersModule';
import UserServiceInterface, {
  USER_SERVICE_TOKEN
} from '../../../applications/services/UserServiceInterface';
import UserEntity from '../../../domain/entities/User';
import UserRepositoryInterface, {
  USER_REPOSITORY_TOKEN
} from '../../../domain/repositories/UserRepositoryInterface';
import UserModule from '../../../UserModule';

describe('UserService', () => {
  let moduleRef: TestingModule;
  let userRepository: UserRepositoryInterface;
  let userService: UserServiceInterface;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [UserModule, TestHelpersModule]
    }).compile();

    userRepository = moduleRef.get<UserRepositoryInterface>(USER_REPOSITORY_TOKEN);
    userService = moduleRef.get<UserServiceInterface>(USER_SERVICE_TOKEN);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('create', () => {
    const userData: User = {
      id: 1,
      name: 'foo',
      age: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    beforeEach(() => {
      jest.spyOn(userRepository, 'create').mockImplementation(() => Promise.resolve(userData));
    });

    it('should return an instance of User entity', async () => {
      const user = await userService.create({
        name: userData.name,
        age: userData.age
      });

      expect(user).toBeInstanceOf(UserEntity);
    });

    it('should return correct created user', async () => {
      const { id, name, age, createdAt, updatedAt } = await userService.create({
        name: userData.name,
        age: userData.age
      });

      expect(id.value).toEqual(userData.id);
      expect(name.value).toEqual(userData.name);
      expect(age.value).toEqual(userData.age);
      expect(createdAt).toEqual(userData.createdAt);
      expect(updatedAt).toEqual(userData.updatedAt);
    });
  });

  describe('getUsers', () => {
    const usersData: User[] = [
      {
        id: 1,
        name: 'foo',
        age: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'bar',
        age: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'baz',
        age: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    beforeEach(() => {
      jest.spyOn(userRepository, 'getUsers').mockImplementation(() => Promise.resolve(usersData));
    });

    it('should return users which has item is an instance of User entity', async () => {
      const users = await userService.getUsers({});

      users.forEach((user) => {
        expect(user).toBeInstanceOf(UserEntity);
      });
    });

    it('should return correct users', async () => {
      const users = await userService.getUsers({});

      users.forEach((user, index) => {
        expect(user).toMatchObject(new UserEntity(usersData[index]));
      });
    });
  });
});
