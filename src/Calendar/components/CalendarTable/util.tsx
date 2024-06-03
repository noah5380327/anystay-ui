import { CalendarTableSelection } from 'anystay-ui/Calendar/components/CalendarTable/interface';
import 'anystay-ui/Calendar/components/CalendarTable/style.less';
import { CalendarRowProp } from 'anystay-ui/Calendar/interface';
import { Dispatch, SetStateAction } from 'react';

export function getColumnBackgroundSelectedStyle(
  rowIndex: number,
  columnIndex: number,
  selection: CalendarTableSelection,
): string {
  const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } =
    selection;

  if (
    rowEndIndex !== -1 &&
    columnEndIndex !== -1 &&
    columnIndex >= columnStartIndex &&
    columnIndex <= columnEndIndex &&
    rowIndex >= rowStartIndex &&
    rowIndex <= rowEndIndex
  ) {
    return 'calendar-table-row-column-selected-background-container';
  }

  return '';
}

export function getColumnBorderSelectedStyle(
  rowIndex: number,
  columnIndex: number,
  selection: CalendarTableSelection,
): string {
  const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } =
    selection;
  const obj = {
    top: false,
    left: false,
    right: false,
    bottom: false,
  };
  let value = '';

  if (!(columnEndIndex === -1 || rowEndIndex === -1)) {
    obj.top =
      rowIndex === rowStartIndex &&
      columnIndex >= columnStartIndex &&
      columnIndex <= columnEndIndex;
    obj.left =
      columnIndex === columnStartIndex &&
      rowIndex >= rowStartIndex &&
      rowIndex <= rowEndIndex;
    obj.right =
      columnIndex === columnEndIndex &&
      rowIndex >= rowStartIndex &&
      rowIndex <= rowEndIndex;
    obj.bottom =
      rowIndex === rowEndIndex &&
      columnIndex >= columnStartIndex &&
      columnIndex <= columnEndIndex;
  }

  if (obj.top) {
    value += ` calendar-table-row-column-selected-border-top-container`;
  }
  if (obj.bottom) {
    value += ` calendar-table-row-column-selected-border-bottom-container`;
  }
  if (obj.left) {
    value += ` calendar-table-row-column-selected-border-left-container`;
  }
  if (obj.right) {
    value += ` calendar-table-row-column-selected-border-right-container`;
  }

  return value;
}

export function getCurrentColumnBorderSelectedStyle(
  rowIndex: number,
  columnIndex: number,
  selection: CalendarTableSelection,
) {
  const { rowCurrentIndex, columnCurrentIndex } = selection;
  if (
    rowCurrentIndex !== -1 &&
    columnCurrentIndex !== -1 &&
    rowIndex === rowCurrentIndex &&
    columnIndex === columnCurrentIndex
  ) {
    return `calendar-table-row-column-current-selected-border-container`;
  }
  return '';
}

export function getColumnDisabledStyle(
  columnIndex: number,
  subtractDayNumber: number,
): string {
  if (columnIndex < subtractDayNumber) {
    return 'calendar-table-row-column-disabled-container';
  }

  return '';
}

export function onClick(
  rowIndex: number,
  columnIndex: number,
  selection: CalendarTableSelection,
  setSelection: Dispatch<SetStateAction<CalendarTableSelection>>,
  subtractDayNumber: number,
) {
  if (columnIndex > subtractDayNumber - 1) {
    setSelection({
      rowStartIndex: selection.rowStartIndex,
      rowEndIndex: rowIndex,
      rowCurrentIndex: selection.rowCurrentIndex,
      columnStartIndex: selection.columnStartIndex,
      columnEndIndex: columnIndex,
      columnCurrentIndex: selection.columnCurrentIndex,
    });
  }
}

export function onMouseDown(
  rowIndex: number,
  columnIndex: number,
  setSelectionVisible: Dispatch<SetStateAction<boolean>>,
  setSelection: Dispatch<SetStateAction<CalendarTableSelection>>,
  subtractDayNumber: number,
) {
  if (columnIndex > subtractDayNumber - 1) {
    setSelectionVisible(true);
    setSelection({
      rowStartIndex: rowIndex,
      rowEndIndex: -1,
      rowCurrentIndex: rowIndex,
      columnStartIndex: columnIndex,
      columnEndIndex: -1,
      columnCurrentIndex: columnIndex,
    });
    const hideSelection = () => {
      setSelectionVisible(false);
      document.removeEventListener('mouseup', hideSelection);
    };
    document.addEventListener('mouseup', hideSelection);
  }
}

export function onMouseOver(
  rowIndex: number,
  columnIndex: number,
  selectionVisible: boolean,
  selection: CalendarTableSelection,
  setSelection: Dispatch<SetStateAction<CalendarTableSelection>>,
  subtractDayNumber: number,
  rowItem: CalendarRowProp,
) {
  if (columnIndex > subtractDayNumber - 1) {
    if (selectionVisible) {
      const currentRow = selection.rowCurrentIndex;
      const currentCol = selection.columnCurrentIndex;
      const rowStart = rowIndex >= currentRow ? currentRow : rowIndex;
      const rowEnd = !(rowIndex >= currentRow) ? currentRow : rowIndex;
      const columnStart = columnIndex >= currentCol ? currentCol : columnIndex;
      const columnEnd = !(columnIndex >= currentCol) ? currentCol : columnIndex;
      setSelection({
        rowStartIndex: rowStart,
        rowEndIndex: rowEnd,
        rowCurrentIndex: currentRow,
        columnStartIndex: columnStart,
        columnEndIndex: columnEnd,
        columnCurrentIndex: currentCol,
      });
    }
  }
}
