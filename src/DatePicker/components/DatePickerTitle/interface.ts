import { DatePickerMonthDate } from 'anystay-ui/DatePicker/interface';
import dayjs from 'dayjs';
export interface CalendarMonthTitleProp {
  monthTitle: string;
  type: string;
  setCustomScrollTop: React.Dispatch<React.SetStateAction<number>>;
  todayScrollTop: React.MutableRefObject<number>;
  monthDate: DatePickerMonthDate;
  monthlyTitleSelectedDate: dayjs.Dayjs;
  setMonthlyTitleSelectedDate: React.Dispatch<
    React.SetStateAction<dayjs.Dayjs>
  >;
  cellHeightMonthly: number;
}
