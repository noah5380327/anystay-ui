import { CalendarDateProp } from 'anystay-ui/Calendar/components/CalendarDate/interface';
import 'anystay-ui/Calendar/components/CalendarDate/style.less';
import moment from 'moment/moment';

export function getDateNumber(value: string): number {
  return moment(value).date();
}

export function getDateWeekDay(value: string): string {
  return moment(value).format('ddd');
}

export function getFirstMonthDatesBorderStyle(
  props: CalendarDateProp,
  index: number,
): string {
  return props.secondMonthDates.length > 0 &&
    index === props.firstMonthDates.length - 1
    ? `calendar-date-value-item-border-container`
    : '';
}

export function getFirstCurrentDateStyle(
  props: CalendarDateProp,
  index: number,
): string {
  const firstDate = props.firstMonthDates[index];
  const today = moment().format('YYYY-MM-DD');
  return firstDate === today
    ? `calendar-date-value-item-wrapper-selected-container`
    : '';
}
