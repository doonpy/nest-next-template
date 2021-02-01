import { AxiosRequestConfig } from 'axios';

import RequestService from '../RequestService';
import { generateUrl, getQueriesForGetMany } from '../utils';
import { UserApiEndpoints } from './constants';

export default class UserService {
  private static instance: UserService;
  private requestService: RequestService;

  constructor() {
    this.requestService = new RequestService();
  }

  public static getInstance(): UserService {
    if (!this.instance) {
      this.instance = new UserService();
    }

    return this.instance;
  }

  public async fetchUsers(limit = 1, offset?: number, keyword?: string): Promise<GetManyUsers> {
    const queries = getQueriesForGetMany(limit, offset, keyword);
    const configs: AxiosRequestConfig = {
      url: generateUrl(UserApiEndpoints.FETCH_USERS, queries)
    };

    return this.requestService.send<GetManyUsers>(configs);
  }
}
