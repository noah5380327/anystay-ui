export interface CalendarProp {
  rows: CalendarRowProp[];
  totalDayNumber?: number;
  subtractDayNumber?: number;
  stepDayNumber?: number;
  onSelect?: (prop: CalendarSelectProp) => void;
  fillRows?: CalendarFillRowProp[];
  columnWidth?: number;
  titleRowHeight?: number;
  dateRowHeight?: number;
}

export interface CalendarRowProp {
  value: string;
  rowId: string;
}

export interface CalendarSelectProp {
  startDate: string;
  endDate: string;
  rowIds: string[];
}

export enum CalendarColumnStatusProp {
  Normal = 'Normal',
  Block = 'Block',
}

export interface CalendarFillRowProp {
  rowId: string;
  columns: CalendarFillColumnProp[];
}

export interface CalendarFillColumnProp {
  startDate: string;
  endDate: string;
  status: CalendarColumnStatusProp;
  value: string;
}

export interface CalendarMonthDate {
  [key: string]: string[];
}
