import { mongodbConnectionBuilder } from './mongodb';

export const edelweissMongodbConnection = mongodbConnectionBuilder({
  dbName: 'edelweiss',
  userName: 'NachoRuiz',
  password: process.env.MONGO_DB_PASSWORD,
});
