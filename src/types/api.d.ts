declare global {
  export interface ApiResponse<Data> {
    statusCode: number;
    data?: Data;
  }

  export interface LimitQuery {
    limit?: number | string;
  }

  export interface OffsetQuery {
    offset?: number | string;
  }

  export interface KeywordQuery {
    keyword?: string;
  }
}

export {};
