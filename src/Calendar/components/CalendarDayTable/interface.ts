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

export interface CalendarDayTableProp {
  monthDate: CalendarMonthDate;
  rows: CalendarRowProp[];
  columnWidth: number;
  totalDayNumber: number;
  subtractDayNumber: number;
  onSelect?: (prop: CalendarSelectProp) => void;
  fillRows?: CalendarFillRowProp[];
  blockRows?: CalendarBlockRowProp[];
  occupiedRows?: CalendarOccupiedRowProp[];
  onOccupiedClick?: (prop: string) => void;
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

export interface CalendarDayTableSelection {
  rowStartIndex: number;
  rowEndIndex: number;
  rowCurrentIndex: number;
  columnStartIndex: number;
  columnEndIndex: number;
  columnCurrentIndex: number;
}

export interface CalendarDayTableCell {
  rowIndex: number;
  columnIndex: number;
  rowId: string;
  date: string;
  startDate: string;
  endDate: string;
  value: string;
  status: CalendarCellStatusProp;
  extra?: any;
  occupied?: CalendarDayTableCellOccupied;
}

export interface CalendarDayTableCellOccupied {
  startDate: string;
  endDate: string;
  link: string;
  name: string;
  text: string;
  avatar?: string;
  color?: string;
  extra?: any;
}

export interface CalendarDayFillRowCell {
  rowId: string;
  date: string;
  startDate: string;
  endDate: string;
  value: string;
  extra?: any;
}

export interface CalendarDayBlockRowCell {
  rowId: string;
  date: string;
  startDate: string;
  endDate: string;
  value: string;
  extra?: any;
}

export interface CalendarDayOccupiedRowCell {
  rowId: string;
  date: string;
  startDate: string;
  endDate: string;
  link: string;
  name: string;
  text: string;
  avatar?: string;
  color?: string;
  extra?: any;
}

export interface CalendarDayTableOccupiedCell {
  width: number;
  left: number;
}
