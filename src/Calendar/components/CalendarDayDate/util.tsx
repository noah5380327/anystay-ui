import {
  CalendarDayDateCell,
  CalendarDayDateProp,
} from 'anystay-ui/Calendar/components/CalendarDayDate/interface';
import 'anystay-ui/Calendar/components/CalendarDayDate/style.less';
import moment from 'moment';

export function generateDateCells(
  props: CalendarDayDateProp,
): CalendarDayDateCell[] {
  const dateCells: CalendarDayDateCell[] = [];

  for (let i = 0; i < Object.keys(props.monthDate).length; i++) {
    const key = Object.keys(props.monthDate)[i];
    const dates = props.monthDate[key];
    for (let j = 0; j < dates.length; j++) {
      dateCells.push({
        date: dates[j],
        month: key,
        dateIndex: j,
      });
    }
  }

  return dateCells;
}

export function getDateNumber(dateCell: CalendarDayDateCell): number {
  const value = dateCell.date;
  return moment(value).date();
}

export function getDateWeekDay(dateCell: CalendarDayDateCell): string {
  const value = dateCell.date;
  return moment(value).format('ddd');
}

export function getBorderStyle(
  props: CalendarDayDateProp,
  dateCell: CalendarDayDateCell,
): string {
  if (Object.keys(props.monthDate).length > 1) {
    const lastKey = Object.keys(props.monthDate)[
      Object.keys(props.monthDate).length - 1
    ];

    if (dateCell.month !== lastKey) {
      const lastDateIndex = props.monthDate[dateCell.month].length - 1;
      if (dateCell.dateIndex === lastDateIndex)
        return 'calendar-day-date-value-item-border-container';
    }
  }

  return '';
}

export function getCurrentStyle(dateCell: CalendarDayDateCell): string {
  const date = dateCell.date;
  const today = moment().format('YYYY-MM-DD');
  return date === today
    ? `calendar-day-date-value-item-wrapper-selected-container`
    : '';
}

export function onScrollPrev(props: CalendarDayDateProp) {
  let currentScrollLeft = props.scrollLeft;
  currentScrollLeft -= props.stepDayNumber * props.columnWidth;
  const minScrollLeft = 0;
  if (currentScrollLeft < minScrollLeft) {
    currentScrollLeft = minScrollLeft;
  }
  props.setCustomScrollLeft(currentScrollLeft);
}

export function onScrollNext(props: CalendarDayDateProp) {
  let currentScrollLeft = props.scrollLeft;
  currentScrollLeft += props.stepDayNumber * props.columnWidth;
  const maxScrollLeft =
    props.totalDayNumber * props.columnWidth - props.clientWidth;
  if (currentScrollLeft > maxScrollLeft) {
    currentScrollLeft = maxScrollLeft;
  }
  props.setCustomScrollLeft(currentScrollLeft);
}
