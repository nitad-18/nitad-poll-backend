import Faker from 'faker';
import { PollOption } from 'src/poll-option/entities/poll-option.entity';
import { Poll } from 'src/poll/entities/poll.entity';
import { define } from 'typeorm-seeding';

type PollOptionContext = {
  poll: Poll;
};

define(PollOption, (faker: typeof Faker, context: PollOptionContext) => {
  const topic = faker.lorem.word();

  const option = new PollOption();
  option.topic = topic;
  option.poll = context.poll;

  return option;
});
