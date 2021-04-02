import { Prisma } from '../../../../../prisma/generated/test-client';
import { PrismaService } from '../../../../common/services/PrismaService';
import { PrismaServiceTest } from '../../../../test_helpers/services/PrismaService.test';
import UserRepository from '../UserRepository';

describe('UserRepository', () => {
  let prismaService: PrismaServiceTest;
  let userRepository: UserRepository;
  const mockUserData: Prisma.UserCreateInput = { name: 'foo', age: 1 };

  beforeEach(() => {
    prismaService = new PrismaServiceTest();
    userRepository = new UserRepository((prismaService as unknown) as PrismaService);
  });

  afterEach(async () => {
    await prismaService.user.deleteMany({ where: { name: mockUserData.name } });
  });

  describe('create', () => {
    it('should create a user in database', async () => {
      const user = await userRepository.create(mockUserData);

      expect(user.name).toEqual(mockUserData.name);
      expect(user.age).toEqual(mockUserData.age);
    });
  });

  describe('getUsers', () => {
    it('should get users from database', async () => {
      const user = await userRepository.create(mockUserData);

      const users = await userRepository.getUsers({});

      expect(users).toEqual([user]);
    });
  });
});
