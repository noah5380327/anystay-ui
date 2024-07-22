import {
  CalendarColumnStatusProp,
  CalendarFillRowProp,
  CalendarMonthDate,
  CalendarRowProp,
  CalendarSelectProp,
} from 'anystay-ui/Calendar/interface';
import { Dispatch, SetStateAction } from 'react';
import { OnScrollParams } from 'react-virtualized';

export interface CalendarTableProp {
  monthDate: CalendarMonthDate;
  rows: CalendarRowProp[];
  columnWidth: number;
  totalDayNumber: number;
  subtractDayNumber: number;
  onSelect?: (prop: CalendarSelectProp) => void;
  fillRows?: CalendarFillRowProp[];
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
}

export interface CalendarTableSelection {
  rowStartIndex: number;
  rowEndIndex: number;
  rowCurrentIndex: number;
  columnStartIndex: number;
  columnEndIndex: number;
  columnCurrentIndex: number;
}

export interface CalendarTableCell {
  rowIndex: number;
  columnIndex: number;
  rowId: string;
  date: string;
  startDate: string;
  endDate: string;
  value: string;
  status: CalendarColumnStatusProp;
  avatar?: string;
  name?: string;
  text?: string;
  extra?: any;
}

export interface CalendarFillRowCell {
  rowId: string;
  date: string;
  startDate: string;
  endDate: string;
  status: CalendarColumnStatusProp;
  value: string;
  avatar?: string;
  name?: string;
  text?: string;
  extra?: any;
}

export interface CalendarTableOccupiedCell {
  width: number;
  left: number;
}
