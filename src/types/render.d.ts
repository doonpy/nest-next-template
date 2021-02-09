declare global {
  export type RequestHandler = (req: any, res: any, query?: any) => Promise<void>;

  export type ErrorRenderer = (
    err: any,
    req: any,
    res: any,
    pathname: any,
    query?: any
  ) => Promise<void>;

  export interface ErrorResponse {
    name?: string;
    message?: string;
    stack?: any;
    statusCode?: number;
  }
}

export {};
