import { exec } from 'child_process';

beforeAll(() => {
  exec('yarn prisma migrate deploy --schema ./prisma/schema.test.prisma');
});

afterAll(() => {
  exec('yarn prisma migrate reset --schema ./prisma/schema.test.prisma --force');
});
