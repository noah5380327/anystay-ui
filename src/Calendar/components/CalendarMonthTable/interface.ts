import {
  CalendarBlockRowProp,
  CalendarCellStatusProp,
  CalendarFillRowProp,
  CalendarMonthDate,
  CalendarMonthlySelectProp,
  CalendarOccupiedRowProp,
  CalendarRowProp,
} from 'anystay-ui/Calendar/interface';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { OnScrollParams } from 'react-virtualized';

export interface CalendarMonthTableProp {
  monthDate: CalendarMonthDate;
  rows: CalendarRowProp[];
  tableHeight: number;
  onSelect?: (prop: CalendarMonthlySelectProp) => void;
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
  setCustomScrollTop: Dispatch<SetStateAction<number>>;
  customScrollTop: number;
  setShowReturnToToday: Dispatch<SetStateAction<boolean>>;
  showReturnToToday: boolean;
  todayScrollTop: React.MutableRefObject<number>;
  setMonthlyTitleSelectedDate: React.Dispatch<
    React.SetStateAction<dayjs.Dayjs>
  >;
  onOccupiedClick?: (prop: string) => void;
  cellHeightMonthly?: number;
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
  color?: string;
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
  color?: string;
}

export interface CalendarMonthTableOccupiedCell {
  width: number;
  left?: number;
  right?: number;
  borderRadiusCornerBothNoNeed?: boolean;
  borderRadiusCornerLeftNoNeed?: boolean;
  borderRadiusCornerRightNoNeed?: boolean;
  translateX?: number;
}
