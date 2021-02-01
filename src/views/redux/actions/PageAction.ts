export enum PageActionTypes {
  SET_PAGE_STATE = 'SET_PAGE_STATE'
}

export default class PageAction {
  private static instance: PageAction;

  public static getInstance(): PageAction {
    if (!this.instance) {
      this.instance = new PageAction();
    }

    return this.instance;
  }

  public setPageState(props: PageState): CustomAction<PageActionTypes, PageState> {
    return {
      type: PageActionTypes.SET_PAGE_STATE,
      payload: { ...props }
    };
  }
}
