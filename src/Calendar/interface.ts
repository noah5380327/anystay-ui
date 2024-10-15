export interface CalendarProp {
  rows: CalendarRowProp[];
  totalDayNumber?: number;
  subtractDayNumber?: number;
  subtractMonthNumber?: number;
  stepDayNumber?: number;
  onSelect?: (prop: CalendarSelectProp | CalendarMonthlySelectProp) => void;
  fillRows?: CalendarFillRowProp[];
  blockRows?: CalendarBlockRowProp[];
  occupiedRows?: CalendarOccupiedRowProp[];
  onOccupiedClick?: (prop: string) => void;
  columnWidth?: number;
  titleRowHeight?: number;
  dateRowHeight?: number;
  type?: CalendarType;
  tableHeight?: number;
  totalMonthNumber?: number;
}

export interface CalendarRowProp {
  value: string;
  rowId: string;
}

export interface CalendarSelectProp {
  startDate: string;
  endDate: string;
  rows: CalenderSelectRowProp[];
}
export interface CalendarMonthlySelectProp {
  startDate: string;
  endDate: string;
  cells: CalendarSelectRowCellProp[];
}

export interface CalenderSelectRowProp {
  id: string;
  cells: CalendarSelectRowCellProp[];
}

export interface CalendarSelectRowCellProp {
  status: CalendarCellStatusProp;
  value: string;
  extra?: any;
  occupied?: CalendarSelectRowCellOccupiedProp;
}

export interface CalendarSelectRowCellOccupiedProp {
  link: string;
  name: string;
  text: string;
  avatar?: string;
  extra?: any;
}

export enum CalendarCellStatusProp {
  Normal = 'Normal',
  Block = 'Block',
}

export interface CalendarFillRowProp {
  rowId: string;
  columns: CalendarFillColumnProp[];
}

export interface CalendarBlockRowProp {
  rowId: string;
  columns: CalendarBlockColumnProp[];
}

export interface CalendarOccupiedRowProp {
  rowId: string;
  columns: CalendarOccupiedColumnProp[];
}

export interface CalendarFillColumnProp {
  startDate: string;
  endDate: string;
  value: string;
  extra?: any;
}

export interface CalendarBlockColumnProp {
  startDate: string;
  endDate: string;
  value: string;
  extra?: any;
}

export interface CalendarOccupiedColumnProp {
  startDate: string;
  endDate: string;
  link: string;
  name: string;
  text: string;
  avatar?: string;
  color?: string;
  extra?: any;
}

export interface CalendarMonthDate {
  [key: string]: string[];
}

export enum CalendarType {
  Day = 'Day',
  Month = 'Month',
}
