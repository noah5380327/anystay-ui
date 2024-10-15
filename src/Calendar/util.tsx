import { CalendarMonthDate } from 'anystay-ui/Calendar/interface';
import 'anystay-ui/Calendar/style.less';
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { OnScrollParams } from 'react-virtualized';

export function generateMonthDate(
  totalDayNumber: number,
  subtractDayNumber: number,
): CalendarMonthDate {
  const startDay = moment().subtract(subtractDayNumber, 'days');

  const dates = [];
  for (let i = 0; i < totalDayNumber; i++) {
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
export function generateMonthDateForMonthly(
  totalMonthNumber: number,
  subtractMonthNumber: number,
): CalendarMonthDate {
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

  const groupedByMonth: CalendarMonthDate = {};

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

export function onCustomDayScroll(
  sp: OnScrollParams,
  customScrollLeft: number,
  setCustomScrollLeft: Dispatch<SetStateAction<number>>,
  onScroll: (params: OnScrollParams) => void,
  setShowReturnToToday: Dispatch<SetStateAction<boolean>>,
  subtractDayNumber: number,
  columnWidth: number,
) {
  setCustomScrollLeft(sp.scrollLeft);
  onScroll({
    ...sp,
    scrollLeft: sp.scrollLeft,
  });

  if (customScrollLeft !== (subtractDayNumber - 2) * columnWidth) {
    setShowReturnToToday(true);
  }
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
