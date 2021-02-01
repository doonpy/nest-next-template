import { HYDRATE } from 'next-redux-wrapper';
import { Action } from 'redux';

declare global {
  export interface RootState {
    [reducerKey: string]: any;
  }

  export interface CustomAction<T = any, P = any> extends Action<T | typeof HYDRATE> {
    payload: P;
  }
}

export {};
