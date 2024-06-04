import {
  CalendarColumnStatusProp,
  CalendarFillRowProp,
  CalendarMonthDate,
  CalendarRowProp,
  CalendarSelectProp,
} from 'anystay-ui/Calendar/interface';
import { OnScrollParams } from 'react-virtualized';

export interface CalendarTableProp {
  monthDate: CalendarMonthDate;
  rows: CalendarRowProp[];
  columnWidth: number;
  dayNumber: number;
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
  value: string;
  status: CalendarColumnStatusProp;
}

export interface CalendarFillRowCell {
  rowId: string;
  date: string;
  status: CalendarColumnStatusProp;
  value: string;
}
