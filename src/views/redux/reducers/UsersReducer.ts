import { HYDRATE } from 'next-redux-wrapper';

import { UsersActionTypes } from '../actions/UsersAction';
import AbstractRootReducer from './AbstractRootReducer';

const REDUCER_KEY = 'users';
const INITIAL_STATE: UsersState = {
  list: [],
  total: 0
};

export default class UsersReducer extends AbstractRootReducer<UsersState> {
  private static instance: UsersReducer;

  constructor() {
    super(REDUCER_KEY, INITIAL_STATE);
  }

  public static getInstance(): UsersReducer {
    if (!this.instance) {
      this.instance = new UsersReducer();
    }

    return this.instance;
  }

  private fetchUsers(state: UsersState, { list, total }: UsersState): UsersState {
    return { ...state, list, total };
  }

  public reducer(
    state: UsersState = this.initialState,
    action: CustomAction<UsersActionTypes, UsersState>
  ): UsersState {
    switch (action.type) {
      case HYDRATE:
        return this.hydrateHandler(state, action.payload);
      case UsersActionTypes.FETCH_USERS:
        return this.fetchUsers(state, action.payload);
      default:
        return { ...state };
    }
  }
}
