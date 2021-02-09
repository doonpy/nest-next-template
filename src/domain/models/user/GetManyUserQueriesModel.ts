export default class GetManyUserQueriesModel {
  private limit?: number;
  private offset?: number;
  private keyword?: string;

  constructor({ limit, offset, keyword }: GetManyUserQueries) {
    if (limit) {
      if (typeof limit === 'string') {
        this.setLimit(parseInt(limit));
      } else {
        this.setLimit(limit);
      }
    }

    if (offset) {
      if (typeof offset === 'string') {
        this.setOffset(parseInt(offset));
      } else {
        this.setOffset(offset);
      }
    }

    if (keyword) {
      this.setKeyword(keyword);
    }
  }

  public getLimit(): number | undefined {
    return this.limit;
  }

  private setLimit(value: number): void {
    this.limit = value;
  }

  public getOffset(): number | undefined {
    return this.offset;
  }

  private setOffset(value: number): void {
    this.offset = value;
  }

  public getKeyword(): string | undefined {
    return this.keyword;
  }

  private setKeyword(value: string): void {
    this.keyword = value;
  }
}
