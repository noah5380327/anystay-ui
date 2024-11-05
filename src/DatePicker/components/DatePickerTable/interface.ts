import {
  CalendarCellStatusProp,
  DatePickerMonthDate,
  DatePickerSelectProp,
} from 'anystay-ui/DatePicker/interface';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { OnScrollParams } from 'react-virtualized';

export interface DatePickerTableProp {
  todayScrollTop: React.MutableRefObject<number>;
  cellHeightMonthly?: number;
  monthDate: DatePickerMonthDate;
  tableHeight: number;
  blockRows?: string[];
  onSelect?: (prop: DatePickerSelectProp) => void;
  monthTitle: string;
  setMonthTitle: Dispatch<SetStateAction<string>>;
  clientHeight: number;
  clientWidth: number;
  setMonthlyTitleSelectedDate: React.Dispatch<
    React.SetStateAction<dayjs.Dayjs>
  >;
  onScroll: (params: OnScrollParams) => void;
  setCustomScrollTop: Dispatch<SetStateAction<number>>;
  customScrollTop: number;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
}

export interface DatePickerTableSelection {
  rowStartIndex: number;
  rowEndIndex: number;
  rowCurrentIndex: number;
  columnStartIndex: number;
  columnEndIndex: number;
  columnCurrentIndex: number;
}

export interface DatePickerTableCell {
  rowIndex: number;
  columnIndex: number;
  value: string;
  virtual: boolean;
  day?: number;
  date?: string;
  status?: CalendarCellStatusProp;
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
  date: string;
  value: string;
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
