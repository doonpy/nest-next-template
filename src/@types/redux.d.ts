import { HYDRATE } from 'next-redux-wrapper';
import { Action } from 'redux';

declare global {
  export type NodeState = PageState | UsersState;

  export interface RootState {
    [key: string]: NodeState;
  }

  export interface CustomAction<T = any, P = any> extends Action<T | typeof HYDRATE> {
    payload: P;
  }
}

export {};
