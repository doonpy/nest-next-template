export default abstract class AbstractRootReducer<S> {
  protected readonly initialState: S;
  protected readonly reducerKey: keyof RootState;

  protected constructor(stateKey: keyof RootState, initialState: S) {
    this.reducerKey = stateKey;
    this.initialState = initialState;
  }

  public getReducerKey(): keyof RootState {
    return this.reducerKey;
  }

  protected hydrateHandler(state: S, payload: NodeState): S {
    return { ...state, ...payload };
  }

  public abstract reducer(state: S, action: CustomAction<any, S>): S;
}
