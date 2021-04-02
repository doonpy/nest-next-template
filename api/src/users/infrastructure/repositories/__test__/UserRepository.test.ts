import { Test } from '@nestjs/testing';

import { Prisma } from '../../../../../prisma/generated/test-client';
import PrismaService from '../../../../../test_helpers/services/PrismaService';
import UserRepositoryInterface, {
  GetUsersParams,
  USER_REPOSITORY_TOKEN
} from '../../../domain/repositories/UserRepositoryInterface';
import UserRepository from '../UserRepository';

describe('UserRepository', () => {
  let userRepository: UserRepositoryInterface;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [{ provide: USER_REPOSITORY_TOKEN, useClass: UserRepository }, PrismaService]
    }).compile();

    userRepository = moduleRef.get<UserRepositoryInterface>(USER_REPOSITORY_TOKEN);
  });

  describe('create', () => {
    const mockUserData: Prisma.UserCreateInput = { name: 'foo', age: 1 };

    it('should create a user in database', async () => {
      const user = await userRepository.create(mockUserData);

      expect(user.name).toEqual(mockUserData.name);
      expect(user.age).toEqual(mockUserData.age);
    });
  });

  describe('getUsers', () => {
    const mockUsersData: Prisma.UserCreateInput[] = [
      { name: 'foo', age: 1 },
      { name: 'baz', age: 2 },
      { name: 'bar', age: 3 },
      { name: 'zef', age: 4 },
      { name: 'xyz', age: 5 }
    ];

    beforeAll(async () => {
      for (const user of mockUsersData) {
        await userRepository.create(user);
      }
    });

    const cases: Array<[string, GetUsersParams, Prisma.UserCreateInput[]]> = [
      ['amount', { take: 1 }, [{ name: 'foo', age: 1 }]],
      [
        'skip',
        { skip: 2 },
        [
          { name: 'bar', age: 3 },
          { name: 'zef', age: 4 },
          { name: 'xyz', age: 5 }
        ]
      ],
      ['where', { where: { name: 'xyz' } }, [{ name: 'xyz', age: 5 }]],
      [
        'cursor',
        { cursor: { id: 4 } },
        [
          { name: 'zef', age: 4 },
          { name: 'xyz', age: 5 }
        ]
      ],
      [
        'order by name',
        { orderBy: { name: 'asc' } },
        [
          { name: 'bar', age: 3 },
          { name: 'baz', age: 2 },
          { name: 'foo', age: 1 },
          { name: 'xyz', age: 5 },
          { name: 'zef', age: 4 }
        ]
      ]
    ];

    it.each(cases)(
      'should get users from database with correct %s',
      async (explain, params, expected) => {
        const users = await userRepository.getUsers(params);

        users.forEach((user, index) => {
          expect(user.name).toEqual(expected[index].name);
          expect(user.age).toEqual(expected[index].age);
        });
      }
    );
  });
});
