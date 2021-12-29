import * as dotenv from 'dotenv';

const envType = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${envType}` });

export default () => ({
  port: parseInt(process.env.PORT) || 8000,
  tokenDuration: process.env.TOKEN_DURATION || '3600s',
  secret: process.env.SECRET,
  influx: {
    username: process.env.INFLUXDB_USERNAME,
    password: process.env.INFLUXDB_PASSWORD,
    host: process.env.INFLUXDB_HOST,
    port: parseInt(process.env.INFLUXDB_PORT) || 8086,
    org: process.env.INFLUXDB_ORG,
    bucket: process.env.INFLUXDB_BUCKET,
    token: process.env.INFLUXDB_TOKEN,
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
});
