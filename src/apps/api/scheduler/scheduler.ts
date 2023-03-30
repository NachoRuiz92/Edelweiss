import cron from 'node-cron';
import { CrossfitClass, reserveClass } from './class-reservator';

export async function scheduleReservations() {
  cron.schedule(
    '00 20 * * *',
    async () => {
      const crossfitClass: CrossfitClass = {
        user: '',
        option: 'Open Box',
        time: '18:00 - 19:00',
        timeOfDay: 'P.M',
      };

      const users = [
        'nachoruizpalomo@gmail.com',
        'Elcalavera9@gmail.com',
        'davmaca@hotmail.com',
        'garviester1975@hotmail.com',
      ];

      await Promise.all(
        users.map((user) => {
          reserveClass({ ...crossfitClass, user: user });
        })
      );
    },
    {
      timezone: 'Europe/Madrid',
    }
  );

  cron.schedule(
    '00 13 * * 5',
    async () => {
      const crossfitClass: CrossfitClass = {
        user: '',
        option: 'Open Box',
        time: '11:00 - 12:00',
        timeOfDay: 'A.M',
      };

      const users = ['nachoruizpalomo@gmail.com', 'Elcalavera9@gmail.com'];

      await Promise.all(
        users.map((user) => {
          reserveClass({ ...crossfitClass, user: user });
        })
      );
    },
    {
      timezone: 'Europe/Madrid',
    }
  );

  cron.schedule(
    '00 14 * * 5',
    async () => {
      const crossfitClass: CrossfitClass = {
        user: '',
        option: 'Open Box',
        time: '12:00 - 13:00',
        timeOfDay: 'A.M',
      };

      const users = ['nachoruizpalomo@gmail.com', 'Elcalavera9@gmail.com'];

      await Promise.all(
        users.map((user) => {
          reserveClass({ ...crossfitClass, user: user });
        })
      );
    },
    {
      timezone: 'Europe/Madrid',
    }
  );

  cron.schedule(
    '00 21 * * *',
    async () => {
      const crossfitClass: CrossfitClass = {
        user: '',
        option: 'Open Box',
        time: '18:00 - 19:00',
        timeOfDay: 'P.M',
      };

      const users = [
        'nachoruizpalomo@gmail.com',
        'Elcalavera9@gmail.com',
        'davmaca@hotmail.com',
        'garviester1975@hotmail.com',
      ];

      await Promise.all(
        users.map((user) => {
          return reserveClass({ ...crossfitClass, user: user });
        })
      );
    },
    {
      timezone: 'Europe/Madrid',
    }
  );
}
