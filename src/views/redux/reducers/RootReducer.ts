import { CombinedState, combineReducers, Reducer } from 'redux';

import AbstractRootReducer from './AbstractRootReducer';
import PageReducer from './PageReducer';
import UsersReducer from './UsersReducer';

export default class RootReducer {
  private static instance: RootReducer;
  private readonly reducerInstances: AbstractRootReducer<any>[];

  constructor() {
    this.reducerInstances = [PageReducer.getInstance(), UsersReducer.getInstance()];
  }

  public static getInstance(): RootReducer {
    if (!this.instance) {
      this.instance = new RootReducer();
    }

    return this.instance;
  }

  public getReducers(): Reducer<CombinedState<RootState>, CustomAction> {
    const reducers: any = {};
    for (const instance of this.reducerInstances) {
      reducers[instance.getReducerKey()] = instance.reducer.bind(instance);
    }

    return combineReducers<RootState>(reducers);
  }
}
