import {
  DatePickerCellStatusProp,
  DatePickerMonthDate,
  DatePickerSelectProp,
} from 'anystay-ui/DatePicker/interface';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { OnScrollParams } from 'react-virtualized';

export interface DatePickerTableProp {
  value: string[];
  minRange: number;
  maxRange: number;
  todayScrollTop: React.MutableRefObject<number>;
  cellHeightMonthly?: number;
  monthDate: DatePickerMonthDate;
  tableHeight: number;
  blockCells?: string[];
  checkoutOnlyCells?: string[];
  unavailableDueToMinimumStayCells?: string[];
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
  status?: DatePickerCellStatusProp;
}

export interface DatePickerBlockCell {
  date: string;
  value: string;
}
export interface DatePickerCheckoutOnlyCell {
  date: string;
  value: string;
}
export interface DatePickerUnavailableDueToMinimumStayCell {
  date: string;
  value: string;
}
