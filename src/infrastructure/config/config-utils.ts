import { DEV_ENV_FILE, ENV_ROOT_PATH, PROD_ENV_FILE } from './constants';

export function getEnvFilePath(): string {
  if (process.env.NODE_ENV === 'production') {
    return `${ENV_ROOT_PATH}/${PROD_ENV_FILE}`;
  }

  return `${ENV_ROOT_PATH}/${DEV_ENV_FILE}`;
}
