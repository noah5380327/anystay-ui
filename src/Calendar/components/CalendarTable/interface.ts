export interface CalendarTableProp {
  rowNumber: number;
  elementWidth: number;
  dayNumber: number;
  disabledColumnNumber?: number;
}

export interface CalendarTableSelection {
  rowStartIndex: number;
  rowEndIndex: number;
  columnStartIndex: number;
  columnEndIndex: number;
}
