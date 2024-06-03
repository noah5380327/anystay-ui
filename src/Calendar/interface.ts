export interface CalendarProp {
  rows: CalendarRowProp[];
  dayNumber?: number;
  subtractDayNumber?: number;
  onSelect?: (prop: CalendarSelectProp) => void;
  fillRows?: CalendarFillProp[];
}

export interface CalendarRowProp {
  price: number;
  itemId: string;
}

export interface CalendarSelectProp {
  startDate: string;
  endDate: string;
  status: CalendarSelectStatusProp;
  price: number;
  itemIds: string[];
}

export enum CalendarSelectStatusProp {
  Available = 'available',
  Block = 'block',
  UnAvailable = 'unAvailable',
}

export interface CalendarFillProp {
  itemId: string;
  items: CalendarFillItemProp[];
}

export interface CalendarFillItemProp {
  startDate: string;
  endDate: string;
  status: CalendarSelectStatusProp;
  price: number;
}

export interface CalendarDates {
  firstMonthDates: string[];
  secondMonthDates: string[];
}
