export interface IResponseBase {
  statusCode: number;
  message: string;
  payload: unknown;
  error: boolean;
  timestamp?: string;
  path?: string;
}

export type IErrorResponseBase = Omit<IResponseBase, "payload">;
