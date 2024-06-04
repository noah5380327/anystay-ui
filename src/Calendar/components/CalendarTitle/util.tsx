import { CalendarTitleProp } from 'anystay-ui/Calendar/components/CalendarTitle/interface';
import 'anystay-ui/Calendar/components/CalendarTitle/style.less';
import moment from 'moment';

export function getDateName(value: string): string {
  return `${moment(value).format('MMMM')} ${moment(value).format('YYYY')}`;
}

export function getBorderStyle(props: CalendarTitleProp, key: string): string {
  if (Object.keys(props.monthDate).length > 1) {
    const lastKey = Object.keys(props.monthDate)[
      Object.keys(props.monthDate).length - 1
    ];

    if (key !== lastKey) {
      return 'calendar-title-text-border';
    }
  }

  return '';
}
