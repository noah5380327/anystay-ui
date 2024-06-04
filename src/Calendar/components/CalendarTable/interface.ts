import {
  CalendarColumnStatusProp,
  CalendarFillRowProp,
  CalendarMonthDate,
  CalendarRowProp,
  CalendarSelectProp,
} from 'anystay-ui/Calendar/interface';

export interface CalendarTableProp {
  monthDate: CalendarMonthDate;
  rows: CalendarRowProp[];
  columnWidth: number;
  dayNumber: number;
  subtractDayNumber: number;
  onSelect?: (prop: CalendarSelectProp) => void;
  fillRows?: CalendarFillRowProp[];
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
