import {
  CalendarFillRowCell,
  CalendarTableCell,
  CalendarTableOccupiedCell,
  CalendarTableProp,
  CalendarTableSelection,
} from 'anystay-ui/Calendar/components/CalendarTable/interface';
import 'anystay-ui/Calendar/components/CalendarTable/style.less';
import {
  CalendarColumnStatusProp,
  CalendarFillRowProp,
  CalendarMonthDate,
  CalendarRowProp,
  CalendarSelectProp,
} from 'anystay-ui/Calendar/interface';
import moment from 'moment';
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

export function getColumBlockStyle(
  tableCells: CalendarTableCell[],
  rowIndex: number,
  columnIndex: number,
): string {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  if (tableCell?.status === CalendarColumnStatusProp.Block) {
    return 'calendar-table-row-column-block-container';
  }

  return '';
}

export function onMouseDown(
  rowIndex: number,
  columnIndex: number,
  selectionVisible: boolean,
  setSelectionVisible: Dispatch<SetStateAction<boolean>>,
  setSelection: Dispatch<SetStateAction<CalendarTableSelection>>,
  subtractDayNumber: number,
  tableCells: CalendarTableCell[],
) {
  if (columnIndex > subtractDayNumber - 1) {
    const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
    if (tableCell?.status !== CalendarColumnStatusProp.Occupied) {
      if (!selectionVisible) {
        setSelectionVisible(true);
        setSelection({
          rowStartIndex: rowIndex,
          rowEndIndex: rowIndex,
          rowCurrentIndex: rowIndex,
          columnStartIndex: columnIndex,
          columnEndIndex: columnIndex,
          columnCurrentIndex: columnIndex,
        });
      } else {
        const hideSelection = () => {
          setSelectionVisible(false);
          document.removeEventListener('mouseup', hideSelection);
        };
        document.addEventListener('mouseup', hideSelection);
      }
    }
  }
}

export function onMouseOver(
  rowIndex: number,
  columnIndex: number,
  selectionVisible: boolean,
  selection: CalendarTableSelection,
  setSelection: Dispatch<SetStateAction<CalendarTableSelection>>,
  subtractDayNumber: number,
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

export function onMouseUp(
  selection: CalendarTableSelection,
  tableCells: CalendarTableCell[],
  onSelect?: (prop: CalendarSelectProp) => void,
) {
  const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } =
    selection;

  if (
    rowStartIndex > -1 &&
    rowEndIndex > -1 &&
    columnStartIndex > -1 &&
    columnEndIndex > -1
  ) {
    if (onSelect) {
      const selectProp: CalendarSelectProp = {
        startDate: '',
        endDate: '',
        rows: [],
      };

      const tableRowCells = getTableRowCells(
        tableCells,
        rowStartIndex,
        rowEndIndex,
        columnStartIndex,
      );
      selectProp.rows = tableRowCells.map((i) => ({
        id: i.rowId,
        columns: [],
      }));

      const tableColumnCells = getTableColumnCells(
        tableCells,
        columnStartIndex,
        columnEndIndex,
        rowStartIndex,
      );
      selectProp.startDate = tableColumnCells[0].date;
      selectProp.endDate = tableColumnCells[tableColumnCells.length - 1].date;

      for (let i = 0; i < tableColumnCells.length; i++) {
        const tableColumnCell = tableColumnCells[i];
        const index = selectProp.rows.findIndex(
          (item) => item.id === tableColumnCell.rowId,
        );
        if (index > -1) {
          selectProp.rows[index].columns.push({
            status: tableColumnCell.status,
            value: tableColumnCell.value,
            avatar: tableColumnCell.avatar || '',
            name: tableColumnCell.name || '',
            text: tableColumnCell.text || '',
            extra: tableColumnCell.extra || '',
          });
        }
      }

      onSelect(selectProp);
    }
  }
}

export function generateDatesFromStartAndEnd(
  startDate: string,
  endDate: string,
): string[] {
  const start = moment(startDate);
  const end = moment(endDate);
  const dateArray: string[] = [];

  while (start <= end) {
    dateArray.push(start.format('YYYY-MM-DD'));
    start.add(1, 'days');
  }

  return dateArray;
}

export function generateFillTableCells(
  fillRows: CalendarFillRowProp[],
): CalendarFillRowCell[] {
  const fillRowCells: CalendarFillRowCell[] = [];
  for (let i = 0; i < fillRows.length; i++) {
    const fillRow = fillRows[i];
    for (let j = 0; j < fillRow.columns.length; j++) {
      const fillRowColumn = fillRow.columns[j];
      const startDate = fillRowColumn.startDate;
      let endDate = fillRowColumn.endDate;
      if (fillRowColumn.status === CalendarColumnStatusProp.Occupied) {
        endDate = startDate;
      }
      const dates = generateDatesFromStartAndEnd(startDate, endDate);
      for (let k = 0; k < dates.length; k++) {
        fillRowCells.push({
          rowId: fillRow.rowId,
          date: dates[k],
          startDate,
          endDate: CalendarColumnStatusProp.Occupied
            ? fillRowColumn.endDate
            : endDate,
          status: fillRowColumn.status,
          value: fillRowColumn.value,
          avatar: fillRowColumn.avatar,
          name: fillRowColumn.name,
          text: fillRowColumn.text,
          extra: fillRowColumn.extra,
        });
      }
    }
  }
  return fillRowCells;
}

export function getFillRowCell(
  fillRowCells: CalendarFillRowCell[],
  rowId: string,
  date: string,
): CalendarFillRowCell {
  return fillRowCells.filter((i) => i.rowId === rowId && i.date === date)?.[0];
}

export function generateTableCells(
  monthDate: CalendarMonthDate,
  rows: CalendarRowProp[],
  fillRows: CalendarFillRowProp[],
): CalendarTableCell[] {
  const tableCells: CalendarTableCell[] = [];
  const fillRowCells = generateFillTableCells(fillRows);
  const allMonthDates = Object.values(monthDate).flat();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowId = row.rowId;
    for (let j = 0; j < allMonthDates.length; j++) {
      const column = allMonthDates[j];
      let value = row.value;
      let status = CalendarColumnStatusProp.Normal;
      let startDate = column;
      let endDate = column;
      let avatar;
      let name;
      let text;
      let extra;
      const fillRowCell = getFillRowCell(fillRowCells, rowId, column);
      if (fillRowCell) {
        value = fillRowCell.value;
        status = fillRowCell.status;
        startDate = fillRowCell.startDate;
        endDate = fillRowCell.endDate;
        avatar = fillRowCell.avatar;
        name = fillRowCell.name;
        text = fillRowCell.text;
        extra = fillRowCell.extra;
      }

      tableCells.push({
        rowIndex: i,
        columnIndex: j,
        rowId,
        date: column,
        startDate,
        endDate,
        value,
        status,
        avatar,
        name,
        text,
        extra,
      });
    }
  }

  return tableCells;
}

export function getTableCell(
  tableCells: CalendarTableCell[],
  rowIndex: number,
  columnIndex: number,
): CalendarTableCell {
  return tableCells.filter(
    (i) => i.rowIndex === rowIndex && i.columnIndex === columnIndex,
  )?.[0];
}

export function getTableRowCells(
  tableCells: CalendarTableCell[],
  rowStartIndex: number,
  rowEndIndex: number,
  columnIndex: number,
): CalendarTableCell[] {
  return tableCells.filter(
    (i) =>
      i.rowIndex >= rowStartIndex &&
      i.rowIndex <= rowEndIndex &&
      i.columnIndex === columnIndex,
  );
}

export function getTableColumnCells(
  tableCells: CalendarTableCell[],
  columnStartIndex: number,
  columnEndIndex: number,
  rowIndex: number,
): CalendarTableCell[] {
  return tableCells.filter(
    (i) =>
      i.columnIndex >= columnStartIndex &&
      i.columnIndex <= columnEndIndex &&
      i.rowIndex === rowIndex,
  );
}

export function returnToToday(props: CalendarTableProp) {
  props.setCustomScrollLeft((props.subtractDayNumber - 2) * props.columnWidth);
  props.setShowReturnToToday(false);
}

export function getTableCellOccupied(
  tableCells: CalendarTableCell[],
  rowIndex: number,
  columnIndex: number,
  props: CalendarTableProp,
): CalendarTableOccupiedCell {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  const startDate = tableCell.startDate;
  const endDate = tableCell.endDate;
  const date = tableCell.date;
  const widthHours = moment
    .duration(moment(endDate).diff(moment(startDate)))
    .asHours();
  const hourColumnWidth = props.columnWidth / 24;
  const width = hourColumnWidth * widthHours;
  const leftHours = moment
    .duration(moment(startDate).diff(moment(date)))
    .asHours();
  const left = hourColumnWidth * leftHours;

  return {
    width,
    left,
  };
}
