import { CalendarMonthDate } from 'anystay-ui/Calendar/interface';
import { OnScrollParams } from 'react-virtualized';

export interface CalendarTitleProp {
  monthDate: CalendarMonthDate;
  columnWidth: number;
  titleRowHeight: number;
  clientHeight: number;
  clientWidth: number;
  onScroll: (params: OnScrollParams) => void;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
}

export interface CalendarTitleCell {
  month: string;
  dates: string[];
}
