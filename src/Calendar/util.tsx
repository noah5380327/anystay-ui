import { CalendarMonthDate } from 'anystay-ui/Calendar/interface';
import 'anystay-ui/Calendar/style.less';
import moment from 'moment';

export function generateMonthDate(
  dayNumber: number,
  subtractDayNumber: number,
): CalendarMonthDate {
  const startDay = moment().subtract(subtractDayNumber, 'days');

  const dates = [];
  for (let i = 0; i < dayNumber; i++) {
    dates.push(startDay.clone().add(i, 'days'));
  }

  const groupedByMonth: CalendarMonthDate = {};

  dates.forEach((date) => {
    const v = date.format('YYYY-MM-DD');
    const month = date.format('YYYY-MM');
    if (!groupedByMonth[month]) {
      groupedByMonth[month] = [];
    }
    groupedByMonth[month].push(v);
  });

  return groupedByMonth;
}
