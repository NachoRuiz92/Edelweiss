import axios from 'axios';
import { isNil } from '../../../shared/type-checkers';
import { User } from './users';
import FormData from 'form-data';

type ClassOption = 'Open Box';

type TimeOfDay = 'A.M' | 'P.M';

type classHours =
  | '18:00 - 19:00'
  | '19:00 - 20:00'
  | '11:00 - 12:00'
  | '12:00 - 13:00';

export interface CrossfitClass {
  user: string;
  option: ClassOption;
  time: classHours;
  timeOfDay: TimeOfDay;
}

function getFormatedTomorrowDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return `${tomorrow.getFullYear()}${('0' + (tomorrow.getMonth() + 1)).slice(
    -2
  )}${('0' + tomorrow.getDate()).slice(-2)}`;
}

async function getClassId(
  time: classHours,
  option: ClassOption,
  timeOfDay: TimeOfDay
) {
  const id = null;

  const date = getFormatedTomorrowDate();

  const {
    data: { bookings },
  } = await axios.get(
    `https://crossfitedelweiss.aimharder.com/api/bookings?day=${date}&familyId=&box=8318&_=1671669203440`
  );

  if (!isNil(bookings) && bookings.length > 0) {
    const classId = bookings.filter(
      (booking: { className: string; time: string }) =>
        booking.className === `${option} ${timeOfDay}` && booking.time === time
    );

    return classId.length > 0 ? classId[0].id : id;
  }

  return id;
}

export async function reserveClass(crossfitClass: CrossfitClass) {
  const [id, [userInfo], date] = await Promise.all([
    getClassId(
      crossfitClass.time,
      crossfitClass.option,
      crossfitClass.timeOfDay
    ),
    User.find({ email: crossfitClass.user }),
    getFormatedTomorrowDate(),
  ]);

  if (!isNil(id)) {
    const data = new FormData();
    data.append('id', id);
    data.append('day', date);
    data.append('insist', '1');
    data.append('familyId', '');

    const headers = {
      Cookie: `amhrdrauth=${userInfo.auth}; AWSALB=heym6P1T/EDJAF7QOQA40ibbAiXxM4EXVSvZInt7V19SpsZQDQXehg+cnE8nuB2mcxWYIEIG7FikcapslKNoY4DUDW89vuMx6JHJ7FZ8PHeEDMLG1YOfHzkl+nUm; AWSALBCORS=heym6P1T/EDJAF7QOQA40ibbAiXxM4EXVSvZInt7V19SpsZQDQXehg+cnE8nuB2mcxWYIEIG7FikcapslKNoY4DUDW89vuMx6JHJ7FZ8PHeEDMLG1YOfHzkl+nUm`,
      ...data.getHeaders(),
    };

    const response = await axios.post(
      'https://crossfitedelweiss.aimharder.com/api/book',
      data,
      {
        headers,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    console.log(
      `${new Date().toLocaleTimeString()} ${crossfitClass.user} result : `,
      response.data
    );
  }
}
