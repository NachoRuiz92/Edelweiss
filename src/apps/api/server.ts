import app from './app';
import 'dotenv/config';
import { edelweissDb } from '../config/db';
import { scheduleReservations } from './scheduler/scheduler';

export const edelweissServer = {
  start(): void {
    app.listen(process.env.PORT || `0.0.0.0:$PORT`, async () => {
      await edelweissDb.connectToDb();
      console.log(`server is running on port ${process.env.PORT}`);
      scheduleReservations();
    });
  },
};
