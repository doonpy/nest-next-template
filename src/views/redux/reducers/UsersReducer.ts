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
    action: CustomAction<UsersActionTypes, UsersState | RootState>
  ): UsersState {
    switch (action.type) {
      case HYDRATE:
        const payload = action.payload as RootState;
        return this.hydrateHandler(state, payload[this.getReducerKey()]);
      case UsersActionTypes.FETCH:
        return this.fetchUsers(state, action.payload as UsersState);
      default:
        return { ...state };
    }
  }
}
