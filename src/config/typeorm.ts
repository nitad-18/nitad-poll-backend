import { ConnectionOptionsWithSeed } from 'src/utilities/type';

//   TODO #TASK 1 set up config for the typeorm
//*  Config MUST use ENV file .env.${NODE_ENV} 
//*  NODE_ENV = development --> use .env.development 
//*  NODE_ENV = production --> use .env.production
//*  HINT setup same as config.ts 

const options: ConnectionOptionsWithSeed = {
  type: 'postgres',
  host: 
  port: 
  database: 
  username: 
  password: 
  synchronize: false,
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeds/*{.ts,.js}'],
  factories: ['src/database/factories/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = options;
