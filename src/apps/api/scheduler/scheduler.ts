import cron from 'node-cron';
import { CrossfitClass, reserveClass } from './class-reservator';

const test: CrossfitClass = {
  user: '',
  option: 'Open Box',
  time: '11:00 - 12:00',
  timeOfDay: 'A.M',
};

export async function scheduleReservations() {
  cron.schedule('* 36 13 * * *', async () => {
    const users = ['nachoruizpalomo@gmail.com'];

    await Promise.all(
      users.map((user) => {
        reserveClass({ ...test, user: user });
      })
    );
  });
}
