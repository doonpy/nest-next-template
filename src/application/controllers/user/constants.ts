import { API_PATH_PREFIX } from '../constant';

export const USER_VIEW_ROOT_PATH = 'user';

export const USER_API_ROOT_PATH = `${API_PATH_PREFIX}/users`;

export const UserViewPaths = {
  CREATE: 'create'
};

export const USER_VIEW_ROOT_TEMPLATE = 'user';

export const UserTemplates = {
  INDEX: USER_VIEW_ROOT_TEMPLATE,
  CREATE: `${USER_VIEW_ROOT_TEMPLATE}/create`
};
