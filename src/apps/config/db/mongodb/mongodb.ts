import mongoose from 'mongoose';
import { MongoConnection } from './mongodb-connection';
import { MongoConnectionParams } from './mongo-connection-params';

export function mongodbConnectionBuilder(
  connection: MongoConnectionParams
): MongoConnection {
  const uri = `mongodb+srv://${connection.userName}:${connection.password}@cluster0.odjnyyv.mongodb.net/${connection.dbName}?retryWrites=true&w=majority`;

  return {
    async connectToDb(): Promise<void> {
      try {
        await mongoose.connect(uri);

        console.log('connected to MongoDB');
      } catch (error) {
        console.log('Error connecting to MongoDb', error);
      }
    },
  };
}
