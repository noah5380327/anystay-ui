import {
  CalendarTitleCell,
  CalendarTitleDate,
  CalendarTitleProp,
} from 'anystay-ui/Calendar/components/CalendarTitle/interface';
import 'anystay-ui/Calendar/components/CalendarTitle/style.less';
import moment from 'moment';

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
  const firstDate = moment(cells[0].dates[0]).format('D MMM YYYY');
  const lastDate = moment(
    cells[cells.length - 1].dates[cells[cells.length - 1].dates.length - 1],
  ).format('D MMM YYYY');
  return {
    firstDate,
    lastDate,
  };
}

export function getDateName(titleCell: CalendarTitleCell): string {
  const value = titleCell.month;
  return `${moment(value).format('MMMM')} ${moment(value).format('YYYY')}`;
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
  const selectedDate = moment(date);
  const firstDate = moment(titleDate.firstDate);
  const diffDays = selectedDate.diff(firstDate, 'days');
  props.setCustomScrollLeft((diffDays - 2) * props.columnWidth);
  props.setShowReturnToToday(false);
}
