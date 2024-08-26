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
