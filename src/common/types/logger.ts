import { Request } from 'express';

export type Logger = {
  uid: string;
  method: string;
  path: string;
  reqBody: string;
  status: number;
  duration: number;
  reqID: string;
};

export type Error = {
  reqID: string;
  status: number;
  message: string;
  error: string;
};

export type RequestWithID = Request & { reqID: string };
