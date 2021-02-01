import UserService from '../../services/user/UserService';

export enum UsersActionTypes {
  FETCH_USERS = 'FETCH_USERS'
}

export default class UsersAction {
  private static instance: UsersAction;
  private readonly userService: UserService;

  constructor() {
    this.userService = UserService.getInstance();
  }

  public static getInstance(): UsersAction {
    if (!this.instance) {
      this.instance = new UsersAction();
    }

    return this.instance;
  }

  private fetchUsers(
    users: GetManyUsersItem[],
    total: number
  ): CustomAction<UsersActionTypes, UsersState> {
    return {
      type: UsersActionTypes.FETCH_USERS,
      payload: { list: users, total }
    };
  }

  public fetchUsersThunk(limit?: number, offset?: number, keyword?: string): FetchUsersThunk {
    return async (dispatch) => {
      const res = await this.userService.fetchUsers(limit, offset, keyword);

      return dispatch(this.fetchUsers(res.users, 0));
    };
  }
}
