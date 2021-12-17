import * as faker from 'faker';
import { PollOption } from 'src/poll-option/entities/poll-option.entity';
import { Poll } from 'src/poll/entities/poll.entity';
import { User } from 'src/user/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class SeedMockPoll implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const users: User[] = await connection.getRepository(User).find();
    for (let i = 0; i < 5; i++) {
      const userIdx = faker.datatype.number({ max: users.length - 1 });
      const poll = await factory(Poll)({ author: users[userIdx] }).create();
      await factory(PollOption)({
        poll: poll,
      }).createMany(faker.datatype.number({ min: 2, max: 7 }));
    }
  }
}
