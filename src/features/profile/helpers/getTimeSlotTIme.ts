import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const getTimeSlotTime = (utcTime: string) => {
  const today = dayjs().format('YYYY-MM-DD');
  const fullUtcTime = `${today}T${utcTime}Z`;

  const localTime = dayjs.utc(fullUtcTime).local().format('HH:mm');

  return localTime;
};
