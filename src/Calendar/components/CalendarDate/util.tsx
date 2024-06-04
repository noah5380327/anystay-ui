import { CalendarDateProp } from 'anystay-ui/Calendar/components/CalendarDate/interface';
import 'anystay-ui/Calendar/components/CalendarDate/style.less';
import moment from 'moment';

export function getDateNumber(value: string): number {
  return moment(value).date();
}

export function getDateWeekDay(value: string): string {
  return moment(value).format('ddd');
}

export function getBorderStyle(
  props: CalendarDateProp,
  key: string,
  dateIndex: number,
): string {
  if (Object.keys(props.monthDate).length > 1) {
    const lastKey = Object.keys(props.monthDate)[
      Object.keys(props.monthDate).length - 1
    ];

    if (key !== lastKey) {
      const lastDateIndex = props.monthDate[key].length - 1;
      if (dateIndex === lastDateIndex)
        return 'calendar-date-value-item-border-container';
    }
  }

  return '';
}

export function getCurrentStyle(date: string): string {
  const today = moment().format('YYYY-MM-DD');
  return date === today
    ? `calendar-date-value-item-wrapper-selected-container`
    : '';
}
