import 'anystay-ui/Calendar/style.less';
import { DatePickerMonthDate } from 'anystay-ui/DatePicker/interface';
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { OnScrollParams } from 'react-virtualized';

export function generateMonthDateForMonthly(
  totalMonthNumber: number,
  subtractMonthNumber: number,
): DatePickerMonthDate {
  const startDay = moment().subtract(subtractMonthNumber, 'month');

  const dates = [];

  // Loop through each month based on the totalMonthNumber
  for (let monthIndex = 0; monthIndex < totalMonthNumber; monthIndex++) {
    const currentMonthStart = startDay
      .clone()
      .add(monthIndex, 'months')
      .startOf('month');
    const currentMonthEnd = currentMonthStart.clone().endOf('month');

    // Loop through all days of the current month
    const currentDate = currentMonthStart.clone();
    while (currentDate.isSameOrBefore(currentMonthEnd)) {
      dates.push(currentDate.clone());
      currentDate.add(1, 'days');
    }
  }

  const groupedByMonth: DatePickerMonthDate = {};

  // Group the dates by month (formatted as YYYY-MM)
  dates.forEach((date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    const month = date.format('YYYY-MM');
    if (!groupedByMonth[month]) {
      groupedByMonth[month] = [];
    }
    groupedByMonth[month].push(formattedDate);
  });

  return groupedByMonth;
}

export function onCustomMonthScroll(
  sp: OnScrollParams,
  setCustomScrollTop: Dispatch<SetStateAction<number>>,
  onScroll: (params: OnScrollParams) => void,
) {
  setCustomScrollTop(sp.scrollTop);
  onScroll({
    ...sp,
    scrollTop: sp.scrollTop,
  });
}
