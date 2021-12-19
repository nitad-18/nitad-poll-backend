import { Poll } from 'src/poll/entities/poll.entity';

export type UserData = {
  id: number;
  username: string;
  displayName: string;
  votedPolls?: Poll[];
  polls?: Poll[];
};
