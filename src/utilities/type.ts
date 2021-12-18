import { Poll } from 'src/poll/entities/poll.entity';
import { User } from 'src/user/entities/user.entity';
import { ConnectionOptions } from 'typeorm';

export type RequestWithUserId = Request & {
  user: { id: number };
};

export type TokenPayload = {
  id: number;
};

export type ConnectionOptionsWithSeed = ConnectionOptions & {
  seeds: string[];
  factories: string[];
};

export type UserData = {
  id: number;
  username: string;
  displayName: string;
  votedPolls?: Poll[];
  polls?: Poll[];
};

export type PollWithoutDeletedDate = {
  id: number;
  question: string;
  isClose: boolean;
  closedDate: Date;
  author: User;
  users?: User[];
  createdDate: Date;
  updatedDate: Date;
};
