import * as dotenv from 'dotenv';

const envType = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${envType}` });

export default () => ({
  port: 
  mode: 
  secret: 
  database: {
    type: 
    host: 
    port: 
    name: 
    username: 
    password: 
  },
});
