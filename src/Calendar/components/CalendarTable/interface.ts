import {
  CalendarFillProp,
  CalendarRowProp,
  CalendarSelectProp,
} from 'anystay-ui/Calendar/interface';

export interface CalendarTableProp {
  rows: CalendarRowProp[];
  elementWidth: number;
  dayNumber: number;
  subtractDayNumber: number;
  onSelect?: (prop: CalendarSelectProp) => void;
  fillRows?: CalendarFillProp[];
}

export interface CalendarTableSelection {
  rowStartIndex: number;
  rowEndIndex: number;
  rowCurrentIndex: number;
  columnStartIndex: number;
  columnEndIndex: number;
  columnCurrentIndex: number;
}
