import PrismaService from './services/PrismaService';

afterAll(async () => {
  const primaService = new PrismaService();
  const propertyNames = Object.getOwnPropertyNames(primaService);
  const modelNames = propertyNames.filter((propertyName) => !propertyName.startsWith('_'));

  await Promise.all(modelNames.map((model) => primaService[model].deleteMany()));
});
