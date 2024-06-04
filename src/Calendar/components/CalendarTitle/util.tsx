import {
  CalendarTitleCell,
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
