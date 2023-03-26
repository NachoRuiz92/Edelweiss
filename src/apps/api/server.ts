import app from './app';
import 'dotenv/config';
import { edelweissDb } from '../config/db';
import { scheduleReservations } from './scheduler/scheduler';

export const edelweissServer = {
  start(): void {
    app.listen(process.env.PORT || `0.0.0.0:$PORT`, async () => {
      await edelweissDb.connectToDb();
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();

      console.log(`La hora actual es ${hour}:${minute}:${second}`);
      console.log(`Server is running on port ${process.env.PORT}`);
      scheduleReservations();
    });
  },
};
