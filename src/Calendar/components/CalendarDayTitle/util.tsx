import { CalendarDayTitleDate } from 'anystay-ui/Calendar/components/CalendarDatePicker/interface';
import {
  CalendarDayTitleCell,
  CalendarDayTitleProp,
} from 'anystay-ui/Calendar/components/CalendarDayTitle/interface';
import 'anystay-ui/Calendar/components/CalendarDayTitle/style.less';
import dayjs from 'dayjs';
import { OnScrollParams } from 'react-virtualized';

export function generateTitleCells(
  props: CalendarDayTitleProp,
): CalendarDayTitleCell[] {
  const titleCells: CalendarDayTitleCell[] = [];

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

export function getTitleDate(
  cells: CalendarDayTitleCell[],
): CalendarDayTitleDate {
  const firstDate = dayjs(cells[0].dates[0]).format('D MMM YYYY');
  const lastDate = dayjs(
    cells[cells.length - 1].dates[cells[cells.length - 1].dates.length - 1],
  ).format('D MMM YYYY');
  return {
    firstDate,
    lastDate,
  };
}

export function getDateName(titleCell: CalendarDayTitleCell): string {
  const value = titleCell.month;
  return `${dayjs(value).format('MMMM')} ${dayjs(value).format('YYYY')}`;
}

export function getBorderStyle(
  props: CalendarDayTitleProp,
  titleCell: CalendarDayTitleCell,
): string {
  if (Object.keys(props.monthDate).length > 1) {
    const lastKey = Object.keys(props.monthDate)[
      Object.keys(props.monthDate).length - 1
    ];

    if (titleCell.month !== lastKey) {
      return 'calendar-day-title-text-border';
    }
  }

  return '';
}

export function getScrollDate(
  params: OnScrollParams,
  props: CalendarDayTitleProp,
  titleDate: CalendarDayTitleDate,
) {
  const number = Math.round(params.scrollLeft / props.columnWidth);
  return dayjs(titleDate.firstDate).add(number + 2, 'day');
}
