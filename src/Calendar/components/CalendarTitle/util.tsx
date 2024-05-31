import { CalendarTitleProp } from 'anystay-ui/Calendar/components/CalendarTitle/interface';
import 'anystay-ui/Calendar/components/CalendarTitle/style.less';
import moment from 'moment';

export function getDateName(value: string): string {
  return `${moment(value).format('MMMM')} ${moment(value).format('YYYY')}`;
}

export function getFirstMonthDatesBorderStyle(
  props: CalendarTitleProp,
): string {
  return props.secondMonthDates.length > 0 ? 'calendar-title-text-border' : '';
}
