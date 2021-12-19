import Faker from 'faker';
import { User } from 'src/user/entities/user.entity';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker, context: { password: string }) => {
  const username = faker.internet.email();
  const displayName = faker.internet.userName();
  const password = context?.password ? context.password : faker.internet.password();

  return new User({ username, displayName, password });
});
