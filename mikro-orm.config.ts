import * as dotenv from 'dotenv';
import createAppConfig from './src/config';
import entities from './src/shared/database/entities';

dotenv.config();

const { database } = createAppConfig(process.env);

export default {
  ...database,
  cache: { enabled: true },
  entities
};
