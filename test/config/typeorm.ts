import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

const envType = process.env.MODE_ENV || 'development';

dotenv.config({ path: `.env.${envType}` });

type ConnectionOptionsWithSeed = ConnectionOptions & {
  seeds: string[];
  factories: string[];
};

const options: ConnectionOptionsWithSeed = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeds/*{.ts,.js}'],
  factories: ['src/database/factories/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  name: 'memory',
};

export = options;
