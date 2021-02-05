import UserService from '../../services/user/UserService';

export enum UsersActionTypes {
  FETCH = 'FETCH',
  UPDATE = 'UPDATE'
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

  private fetch(users: UserListItem[], total: number): CustomAction<UsersActionTypes, UsersState> {
    return {
      type: UsersActionTypes.FETCH,
      payload: { list: users, total }
    };
  }

  public fetchThunk(limit?: number, offset?: number, keyword?: string): FetchUsersThunk {
    return async (dispatch) => {
      const res = await this.userService.fetchUsers(limit, offset, keyword);
      const users = res.data ? res.data.users : [];

      return dispatch(this.fetch(users, 0));
    };
  }

  public updateThunk(users: UserListItem[]): FetchUsersThunk {
    return async (dispatch, getState) => {
      const state = getState();
      const currentTotal = 'total' in state.users ? state.users.total : 0;
      const currentUsers = 'list' in state.users ? state.users.list : [];

      return dispatch(this.fetch([...currentUsers, ...users], currentTotal + users.length));
    };
  }
}
