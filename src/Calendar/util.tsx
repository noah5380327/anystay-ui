import { CalendarDates } from 'anystay-ui/Calendar/interface';
import 'anystay-ui/Calendar/style.less';
import moment from 'moment/moment';

export function generateDates(): CalendarDates {
  const today = moment();

  const dates = [];
  const monthDates1: string[] = [];
  const monthDates2: string[] = [];
  for (let i = 0; i < 14; i++) {
    dates.push(today.clone().add(i, 'days'));
  }

  const firstMonthNumber = dates[0].month();

  dates.forEach((date) => {
    if (date.month() === firstMonthNumber) {
      monthDates1.push(date.format('YYYY-MM-DD'));
    } else {
      monthDates2.push(date.format('YYYY-MM-DD'));
    }
  });

  return {
    firstMonthDates: monthDates1,
    secondMonthDates: monthDates2,
  };
}
