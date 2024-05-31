import { CalendarTableSelection } from 'anystay-ui/Calendar/components/CalendarTable/interface';
import 'anystay-ui/Calendar/components/CalendarTable/style.less';
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

export function getColumnDisabledStyle(
  columnIndex: number,
  disabledColumnNumber: number,
): string {
  if (columnIndex < disabledColumnNumber) {
    return 'calendar-table-row-column-disabled-container';
  }

  return '';
}

export function onMouseDown(
  rowIndex: number,
  columnIndex: number,
  setSelectionVisible: Dispatch<SetStateAction<boolean>>,
  setSelection: Dispatch<SetStateAction<CalendarTableSelection>>,
  disabledColumnNumber: number,
) {
  if (columnIndex > disabledColumnNumber - 1) {
    setSelectionVisible(true);
    setSelection({
      rowStartIndex: rowIndex,
      rowEndIndex: -1,
      columnStartIndex: columnIndex,
      columnEndIndex: -1,
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
  disabledColumnNumber: number,
) {
  if (columnIndex > disabledColumnNumber - 1) {
    if (selectionVisible) {
      setSelection({
        rowStartIndex: selection.rowStartIndex,
        rowEndIndex: rowIndex,
        columnStartIndex: selection.columnStartIndex,
        columnEndIndex: columnIndex,
      });
    }
  }
}
