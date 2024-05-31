import { Dispatch, SetStateAction } from 'react';

export interface CalendarDateProp {
  firstMonthDates: string[];
  secondMonthDates: string[];
  setElementWidth: Dispatch<SetStateAction<number>>;
  dayNumber: number;
}
