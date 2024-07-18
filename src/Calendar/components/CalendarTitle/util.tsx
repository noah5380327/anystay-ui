import {
  CalendarTitleCell,
  CalendarTitleDate,
  CalendarTitleProp,
} from 'anystay-ui/Calendar/components/CalendarTitle/interface';
import 'anystay-ui/Calendar/components/CalendarTitle/style.less';
import dayjs from 'dayjs';
import { OnScrollParams } from 'react-virtualized';

export function generateTitleCells(
  props: CalendarTitleProp,
): CalendarTitleCell[] {
  const titleCells: CalendarTitleCell[] = [];

  for (let i = 0; i < Object.keys(props.monthDate).length; i++) {
    const key = Object.keys(props.monthDate)[i];
    const dates = props.monthDate[key];
    titleCells.push({
      month: key,
      dates,
    });
  }

  return titleCells;
}

export function getTitleDate(cells: CalendarTitleCell[]): CalendarTitleDate {
  const firstDate = dayjs(cells[0].dates[0]).format('D MMM YYYY');
  const lastDate = dayjs(
    cells[cells.length - 1].dates[cells[cells.length - 1].dates.length - 1],
  ).format('D MMM YYYY');
  return {
    firstDate,
    lastDate,
  };
}

export function getDateName(titleCell: CalendarTitleCell): string {
  const value = titleCell.month;
  return `${dayjs(value).format('MMMM')} ${dayjs(value).format('YYYY')}`;
}

export function getBorderStyle(
  props: CalendarTitleProp,
  titleCell: CalendarTitleCell,
): string {
  if (Object.keys(props.monthDate).length > 1) {
    const lastKey = Object.keys(props.monthDate)[
      Object.keys(props.monthDate).length - 1
    ];

    if (titleCell.month !== lastKey) {
      return 'calendar-title-text-border';
    }
  }

  return '';
}

export function reSetScrollLeft(
  date: string,
  props: CalendarTitleProp,
  titleDate: CalendarTitleDate,
) {
  const selectedDate = dayjs(date).startOf('month');
  const firstDate = dayjs(titleDate.firstDate);
  const diffDays = selectedDate.diff(firstDate, 'days');
  props.setCustomScrollLeft((diffDays - 2) * props.columnWidth);
  props.setShowReturnToToday(false);
}

export function getScrollDate(
  params: OnScrollParams,
  props: CalendarTitleProp,
  titleDate: CalendarTitleDate,
) {
  const number = Math.round(params.scrollLeft / props.columnWidth);
  return dayjs(titleDate.firstDate).add(number + 2, 'day');
}
