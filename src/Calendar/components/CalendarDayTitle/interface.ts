import { CalendarMonthDate } from 'anystay-ui/Calendar/interface';
import { Dispatch, SetStateAction } from 'react';
import { OnScrollParams } from 'react-virtualized';

export interface CalendarDayTitleProp {
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
  setCustomScrollLeft: Dispatch<SetStateAction<number>>;
  showReturnToToday: boolean;
  setShowReturnToToday: Dispatch<SetStateAction<boolean>>;
  type: string;
}

export interface CalendarDayTitleCell {
  month: string;
  dates: string[];
}
