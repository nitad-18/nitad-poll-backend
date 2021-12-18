import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class SeedMockUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const SALTROUND = 10;
    const password = await bcrypt.hash('adminadmin', SALTROUND);
    await factory(User)().createMany(20, { password: password });
  }
}
