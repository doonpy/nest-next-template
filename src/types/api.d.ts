declare global {
  export interface CommonResponse {
    statusCode: number;
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
