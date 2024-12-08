import { CalendarMonthDate } from 'anystay-ui/Calendar/interface';
import { OnScrollParams } from 'react-virtualized';

export interface CalendarDayDateProp {
  monthDate: CalendarMonthDate;
  totalDayNumber: number;
  stepDayNumber: number;
  columnWidth: number;
  dateRowHeight: number;
  clientHeight: number;
  clientWidth: number;
  onScroll: (params: OnScrollParams) => void;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
  smoothScrollTo: (targetScrollLeft: number) => void;
  setCustomScrollLeft: React.Dispatch<React.SetStateAction<number>>;
  subtractDayNumber: number;
}

export interface CalendarDayDateCell {
  date: string;
  month: string;
  dateIndex: number;
}
