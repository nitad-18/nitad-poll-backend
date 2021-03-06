import Faker from 'faker';
import { Poll } from 'src/poll/entities/poll.entity';
import { User } from 'src/user/entities/user.entity';
import { define } from 'typeorm-seeding';

type PollContext = {
  author: User;
  isClose?: boolean;
  closedDate?: Date;
};

define(Poll, (faker: typeof Faker, context: PollContext) => {
  const question = faker.lorem.sentence();
  const closedDate = context?.closedDate ? context.closedDate : null;
  const isClose = context?.isClose ? context.isClose : false;

  return new Poll({ question, closedDate, isClose, author: context.author });
});
