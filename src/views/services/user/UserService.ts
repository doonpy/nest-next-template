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

  public async fetchUsers(
    limit?: number,
    offset?: number,
    keyword?: string
  ): Promise<ApiResponse<GetManyUsersResponse>> {
    const queries = getQueriesForGetMany(limit, offset, keyword);
    const configs: AxiosRequestConfig = {
      url: generateUrl(UserApiEndpoints.ROOT, queries)
    };

    return this.requestService.send<GetManyUsersResponse>(configs);
  }

  public async createUser(user: ICreateUserArgs): Promise<ApiResponse<CreateUserResponse>> {
    const configs: AxiosRequestConfig = {
      url: UserApiEndpoints.ROOT,
      method: 'POST',
      data: user
    };

    return this.requestService.send<CreateUserResponse>(configs);
  }
}
