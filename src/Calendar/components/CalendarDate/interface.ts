import { CalendarMonthDate } from 'anystay-ui/Calendar/interface';
import { OnScrollParams } from 'react-virtualized';

export interface CalendarDateProp {
  monthDate: CalendarMonthDate;
  dayNumber: number;
  columnWidth: number;
  dateRowHeight: number;
  clientHeight: number;
  clientWidth: number;
  onScroll: (params: OnScrollParams) => void;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
}

export interface CalendarDateCell {
  date: string;
  month: string;
  dateIndex: number;
}
