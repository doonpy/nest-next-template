export default abstract class AbstractRootReducer<S> {
  protected readonly initialState: S;
  protected readonly reducerKey: string;

  protected constructor(stateKey: string, initialState: S) {
    this.reducerKey = stateKey;
    this.initialState = initialState;
  }

  public getReducerKey(): string {
    return this.reducerKey;
  }

  protected hydrateHandler(state: S, payload: RootState): S {
    return {
      ...state,
      ...payload[this.getReducerKey()]
    };
  }

  public abstract reducer(state: S, action: CustomAction<any, S>): S;
}
