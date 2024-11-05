import { CalendarMonthDate } from 'anystay-ui/Calendar/interface';
import dayjs from 'dayjs';
export interface CalendarMonthTitleProp {
  monthTitle: string;
  monthDate: CalendarMonthDate;
  setCustomScrollTop: React.Dispatch<React.SetStateAction<number>>;
  todayScrollTop: React.MutableRefObject<number>;
  cellHeightMonthly: number;
  monthlyTitleSelectedDate: dayjs.Dayjs;
  setMonthlyTitleSelectedDate: React.Dispatch<
    React.SetStateAction<dayjs.Dayjs>
  >;
}
