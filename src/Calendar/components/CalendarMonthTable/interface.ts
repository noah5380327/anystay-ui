import {
  CalendarBlockRowProp,
  CalendarCellStatusProp,
  CalendarFillRowProp,
  CalendarMonthDate,
  CalendarOccupiedRowProp,
  CalendarRowProp,
  CalendarSelectProp,
} from 'anystay-ui/Calendar/interface';
import { Dispatch, SetStateAction } from 'react';
import { OnScrollParams } from 'react-virtualized';

export interface CalendarMonthTableProp {
  monthDate: CalendarMonthDate;
  rows: CalendarRowProp[];
  tableHeight: number;
  onSelect?: (prop: CalendarSelectProp) => void;
  fillRows?: CalendarFillRowProp[];
  blockRows?: CalendarBlockRowProp[];
  occupiedRows?: CalendarOccupiedRowProp[];
  monthTitle: string;
  setMonthTitle: Dispatch<SetStateAction<string>>;
  clientHeight: number;
  clientWidth: number;
  onScroll: (params: OnScrollParams) => void;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
}

export interface CalendarMonthTableSelection {
  rowStartIndex: number;
  rowEndIndex: number;
  rowCurrentIndex: number;
  columnStartIndex: number;
  columnEndIndex: number;
  columnCurrentIndex: number;
}

export interface CalendarMonthTableCell {
  rowIndex: number;
  columnIndex: number;
  rowId: string;
  value: string;
  virtual: boolean;
  day?: number;
  date?: string;
  startDate?: string;
  endDate?: string;
  status?: CalendarCellStatusProp;
  extra?: any;
  occupied?: CalendarMonthTableCellOccupied;
}

export interface CalendarMonthTableCellOccupied {
  startDate: string;
  endDate: string;
  link: string;
  name: string;
  text: string;
  avatar?: string;
  extra?: any;
}

export interface CalendarMonthFillRowCell {
  rowId: string;
  date: string;
  startDate: string;
  endDate: string;
  value: string;
  extra?: any;
}

export interface CalendarMonthBlockRowCell {
  rowId: string;
  date: string;
  startDate: string;
  endDate: string;
  value: string;
  extra?: any;
}

export interface CalendarMonthOccupiedRowCell {
  rowId: string;
  date: string;
  startDate: string;
  endDate: string;
  link: string;
  name: string;
  text: string;
  avatar?: string;
  extra?: any;
}
