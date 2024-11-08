export interface DatePickerProp {
  totalMonthNumber?: number;
  subtractMonthNumber?: number;
  onSelect?: (prop: DatePickerSelectProp) => void;
  blockCells?: string[];
  checkoutOnlyCells?: string[];
  unavailableDueToMinimumStayCells?: string[];
  columnWidth?: number;
  titleRowHeight?: number;
  dateRowHeight?: number;
  tableHeight?: number;
  cellHeightMonthly?: number;
  minRange?: number;
  maxRange?: number;
}

export interface DatePickerSelectProp {
  startDate: string;
  endDate: string;
}

export enum DatePickerCellStatusProp {
  Normal = 'Normal',
  Block = 'Block',
  CheckoutOnly = 'CheckoutOnly',
}

export interface DatePickerMonthDate {
  [key: string]: string[];
}
