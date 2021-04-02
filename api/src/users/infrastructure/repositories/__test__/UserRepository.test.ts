import { Test } from '@nestjs/testing';

import { Prisma, User } from '../../../../../prisma/generated/test-client';
import PrismaService from '../../../../../test_helpers/services/PrismaService';
import importSqlFile from '../../../../../test_helpers/utils/importSqlFile';
import UserRepositoryInterface, {
  GetUsersParams,
  USER_REPOSITORY_TOKEN
} from '../../../domain/repositories/UserRepositoryInterface';
import UserRepository from '../UserRepository';

describe('UserRepository', () => {
  let userRepository: UserRepositoryInterface;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [{ provide: USER_REPOSITORY_TOKEN, useClass: UserRepository }, PrismaService]
    }).compile();

    userRepository = moduleRef.get<UserRepositoryInterface>(USER_REPOSITORY_TOKEN);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
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
    const mockUsersData: User[] = [
      {
        id: 1,
        name: 'foo',
        age: 1,
        createdAt: new Date(1619888400000),
        updatedAt: new Date(1619888400000)
      },
      {
        id: 2,
        name: 'baz',
        age: 2,
        createdAt: new Date(1619888400000),
        updatedAt: new Date(1619888400000)
      },
      {
        id: 3,
        name: 'bar',
        age: 3,
        createdAt: new Date(1619888400000),
        updatedAt: new Date(1619888400000)
      },
      {
        id: 4,
        name: 'zef',
        age: 4,
        createdAt: new Date(1619888400000),
        updatedAt: new Date(1619888400000)
      },
      {
        id: 5,
        name: 'xyz',
        age: 5,
        createdAt: new Date(1619888400000),
        updatedAt: new Date(1619888400000)
      }
    ];

    beforeAll(async () => {
      await prismaService.user.deleteMany();
      await importSqlFile(__dirname, `getUsers.sql`);
    });

    const cases: Array<[string, GetUsersParams, User[]]> = [
      ['amount', { take: 1 }, [mockUsersData[0]]],
      ['skip', { skip: 2 }, [mockUsersData[2], mockUsersData[3], mockUsersData[4]]],
      ['where', { where: { name: 'xyz' } }, [mockUsersData[4]]],
      ['cursor', { cursor: { id: 4 } }, [mockUsersData[3], mockUsersData[4]]],
      [
        'order by name',
        { orderBy: { name: 'asc' } },
        [mockUsersData[2], mockUsersData[1], mockUsersData[0], mockUsersData[4], mockUsersData[3]]
      ]
    ];

    it.each(cases)(
      'should get users from database with correct %s',
      async (explain, params, expected) => {
        const users = await userRepository.getUsers(params);

        expect(users).toHaveLength(expected.length);

        users.forEach((user, index) => {
          expect(user).toMatchObject(expected[index]);
        });
      }
    );
  });
});
