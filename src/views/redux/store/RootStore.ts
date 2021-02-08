import { Context, createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import RootReducer from '../reducers/RootReducer';

export default class RootStore {
  private static instance: RootStore;
  private readonly wrapper = createWrapper<RootState, CustomAction>(
    RootStore.makeStore.bind(this),
    {
      debug: process.env.NODE_ENV !== 'production'
    }
  );

  public static getInstance(): RootStore {
    if (!this.instance) {
      this.instance = new RootStore();
    }

    return this.instance;
  }

  private getEnhancers() {
    if (process.env.NODE_ENV !== 'production') {
      return composeWithDevTools(applyMiddleware(thunk));
    } else {
      return applyMiddleware(thunk);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static makeStore(context: Context) {
    return createStore<RootState, CustomAction, any, any>(
      RootReducer.getInstance().getReducers(),
      RootStore.getInstance().getEnhancers()
    );
  }

  public getWrapper() {
    return this.wrapper;
  }
}
