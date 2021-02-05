declare global {
  export interface ApiResponse<Data> {
    statusCode: number;
    data?: Data;
  }

  export interface LimitQuery {
    limit?: number;
  }

  export interface OffsetQuery {
    offset?: number;
  }

  export interface KeywordQuery {
    keyword?: string;
  }
}

export {};
