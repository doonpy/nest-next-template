import * as fs from 'fs';
import * as path from 'path';

import PrismaService from '../services/PrismaService';

async function importSqlFile(dirname: string, filePath: string): Promise<void> {
  const fullPath = path.join(dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error('File path not found.');
  }

  const query = fs.readFileSync(fullPath, { encoding: 'utf-8' });
  try {
    await new PrismaService().$executeRaw(query);
  } catch (error) {
    throw new Error(error);
  }
}

export default importSqlFile;
