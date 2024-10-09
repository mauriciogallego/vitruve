import { Method } from 'axios';

export type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

export type Headers = {
  'Content-Type': string;
  'Access-Control-Allow-Origin': string;
  'Cache-Control': string;
  Pragma: string;
};

export type Options = {
  data?: object;
  method?: Method;
  headers?: object;
  params?: object;
  reqServerSide?: unknown;
  responseType?: ResponseType;
};
