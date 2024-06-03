import { CalendarDates } from 'anystay-ui/Calendar/interface';
import 'anystay-ui/Calendar/style.less';
import moment from 'moment';

export function generateDates(
  dayNumber: number,
  subtractDayNumber: number,
): CalendarDates {
  const startDay = moment().subtract(subtractDayNumber, 'days');

  const dates = [];
  const monthDates1: string[] = [];
  const monthDates2: string[] = [];
  const allMonthDates: string[] = [];
  for (let i = 0; i < dayNumber; i++) {
    dates.push(startDay.clone().add(i, 'days'));
  }

  const firstMonthNumber = dates[0].month();

  dates.forEach((date) => {
    const v = date.format('YYYY-MM-DD');
    if (date.month() === firstMonthNumber) {
      monthDates1.push(v);
    } else {
      monthDates2.push(v);
    }
    allMonthDates.push(v);
  });

  return {
    firstMonthDates: monthDates1,
    secondMonthDates: monthDates2,
    allMonthDates,
  };
}
