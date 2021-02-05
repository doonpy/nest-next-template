import { HYDRATE } from 'next-redux-wrapper';

import { PageActionTypes } from '../actions/PageAction';
import AbstractRootReducer from './AbstractRootReducer';

const REDUCER_KEY = 'page';
const INITIAL_STATE: PageState = {
  title: ''
};

export default class PageReducer extends AbstractRootReducer<PageState> {
  private static instance: PageReducer;

  constructor() {
    super(REDUCER_KEY, INITIAL_STATE);
  }

  public static getInstance(): PageReducer {
    if (!this.instance) {
      this.instance = new PageReducer();
    }

    return this.instance;
  }

  public reducer(
    state: PageState = this.initialState,
    action: CustomAction<PageActionTypes, PageState | RootState>
  ): PageState {
    switch (action.type) {
      case HYDRATE:
        const payload = action.payload as RootState;

        return this.hydrateHandler(state, payload[this.getReducerKey()]);
      case PageActionTypes.SET_PAGE_STATE:
        return { ...state, ...action.payload };
      default:
        return { ...state };
    }
  }
}
