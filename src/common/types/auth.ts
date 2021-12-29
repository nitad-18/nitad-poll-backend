import { Request } from 'express';

export type RequestWithUserId = Request & {
  user: { id: number };
};

export type TokenPayload = {
  id: number;
};
