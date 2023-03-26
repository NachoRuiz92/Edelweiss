import cron from 'node-cron';
import { CrossfitClass, reserveClass } from './class-reservator';

const test: CrossfitClass = {
  user: '',
  option: 'Open Box',
  time: '11:00 - 12:00',
  timeOfDay: 'A.M',
};

export async function scheduleReservations() {
  const users = ['nachoruizpalomo@gmail.com', 'Elcalavera9@gmail.com'];

  cron.schedule('* 43 19 * * *', async () => {
    await Promise.all(
      users.map((user) => {
        reserveClass({ ...test, user: user });
      })
    );
  });
}
