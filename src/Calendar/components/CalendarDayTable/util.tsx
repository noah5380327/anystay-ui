import {
  CalendarDayBlockRowCell,
  CalendarDayFillRowCell,
  CalendarDayOccupiedRowCell,
  CalendarDayTableCell,
  CalendarDayTableOccupiedCell,
  CalendarDayTableProp,
  CalendarDayTableSelection,
} from 'anystay-ui/Calendar/components/CalendarDayTable/interface';
import 'anystay-ui/Calendar/components/CalendarDayTable/style.less';
import {
  CalendarBlockRowProp,
  CalendarCellStatusProp,
  CalendarFillRowProp,
  CalendarMonthDate,
  CalendarOccupiedRowProp,
  CalendarRowProp,
  CalendarSelectProp,
} from 'anystay-ui/Calendar/interface';
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';

let timer: NodeJS.Timeout;
const longPressThreshold = 500;

export function getColumnBackgroundSelectedStyle(
  rowIndex: number,
  columnIndex: number,
  selection: CalendarDayTableSelection,
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
    return 'calendar-day-table-row-column-selected-background-container';
  }

  return '';
}

export function getColumnBorderSelectedStyle(
  rowIndex: number,
  columnIndex: number,
  selection: CalendarDayTableSelection,
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
    value += ` calendar-day-table-row-column-selected-border-top-container`;
  }
  if (obj.bottom) {
    value += ` calendar-day-table-row-column-selected-border-bottom-container`;
  }
  if (obj.left) {
    value += ` calendar-day-table-row-column-selected-border-left-container`;
  }
  if (obj.right) {
    value += ` calendar-day-table-row-column-selected-border-right-container`;
  }

  return value;
}

export function getCurrentColumnBorderSelectedStyle(
  rowIndex: number,
  columnIndex: number,
  selection: CalendarDayTableSelection,
) {
  const { rowCurrentIndex, columnCurrentIndex } = selection;
  if (
    rowCurrentIndex !== -1 &&
    columnCurrentIndex !== -1 &&
    rowIndex === rowCurrentIndex &&
    columnIndex === columnCurrentIndex
  ) {
    return `calendar-day-table-row-column-current-selected-border-container`;
  }
  return '';
}

export function getColumnDisabledStyle(
  columnIndex: number,
  subtractDayNumber: number,
): string {
  if (columnIndex < subtractDayNumber) {
    return 'calendar-day-table-row-column-disabled-container';
  }

  return '';
}

export function getColumBlockStyle(
  tableCells: CalendarDayTableCell[],
  rowIndex: number,
  columnIndex: number,
): string {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  if (tableCell?.status === CalendarCellStatusProp.Block) {
    return 'calendar-day-table-row-column-block-container';
  }

  return '';
}

export function onMouseDown(
  rowIndex: number,
  columnIndex: number,
  selectionVisible: boolean,
  setSelectionVisible: Dispatch<SetStateAction<boolean>>,
  setSelection: Dispatch<SetStateAction<CalendarDayTableSelection>>,
  subtractDayNumber: number,
) {
  if (columnIndex > subtractDayNumber - 1) {
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
      timer = setTimeout(() => {
        clearSelection(setSelectionVisible);
      }, longPressThreshold);
    } else {
      clearTimeout(timer);
      clearSelection(setSelectionVisible);
    }
  }
}

export function clearSelection(
  setSelectionVisible: Dispatch<SetStateAction<boolean>>,
) {
  const hideSelection = () => {
    setSelectionVisible(false);
    document.removeEventListener('mouseup', hideSelection);
  };
  document.addEventListener('mouseup', hideSelection);
}

export function onMouseOver(
  rowIndex: number,
  columnIndex: number,
  selectionVisible: boolean,
  selection: CalendarDayTableSelection,
  setSelection: Dispatch<SetStateAction<CalendarDayTableSelection>>,
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
  selection: CalendarDayTableSelection,
  tableCells: CalendarDayTableCell[],
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
        cells: [],
      }));

      const tableColumnCells = getTableColumnCells(
        tableCells,
        columnStartIndex,
        columnEndIndex,
        rowStartIndex,
      );
      selectProp.startDate = tableColumnCells[0].date;
      selectProp.endDate = tableColumnCells[tableColumnCells.length - 1].date;

      for (let i = rowStartIndex; i <= rowEndIndex; i++) {
        const cells = getTableColumnCells(
          tableCells,
          columnStartIndex,
          columnEndIndex,
          i,
        );
        for (let j = 0; j < cells.length; j++) {
          const cell = cells[j];
          const index = selectProp.rows.findIndex(
            (item) => item.id === cell.rowId,
          );
          if (index > -1) {
            selectProp.rows[index].cells.push({
              status: cell.status,
              value: cell.value,
              extra: cell.extra || '',
              occupied: {
                link: cell.occupied?.link || '',
                name: cell.occupied?.name || '',
                text: cell.occupied?.text || '',
                avatar: cell.occupied?.avatar || '',
                extra: cell.occupied?.extra || '',
              },
            });
          }
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
  const start = moment(startDate).startOf('day');
  const end = moment(endDate).startOf('day');
  const dateArray: string[] = [];

  while (start <= end) {
    dateArray.push(start.format('YYYY-MM-DD'));
    start.add(1, 'days');
  }

  return dateArray;
}

export function generateFillTableCells(
  fillRows: CalendarFillRowProp[],
): CalendarDayFillRowCell[] {
  const fillRowCells: CalendarDayFillRowCell[] = [];
  for (let i = 0; i < fillRows.length; i++) {
    const fillRow = fillRows[i];
    for (let j = 0; j < fillRow.columns.length; j++) {
      const fillRowColumn = fillRow.columns[j];
      const startDate = fillRowColumn.startDate;
      const endDate = fillRowColumn.endDate;
      const dates = generateDatesFromStartAndEnd(startDate, endDate);
      for (let k = 0; k < dates.length; k++) {
        fillRowCells.push({
          rowId: fillRow.rowId,
          date: dates[k],
          startDate,
          endDate,
          value: fillRowColumn.value,
          extra: fillRowColumn.extra,
        });
      }
    }
  }
  return fillRowCells;
}

export function generateBlockTableCells(
  blockRows: CalendarBlockRowProp[],
): CalendarDayBlockRowCell[] {
  const blockRowCells: CalendarDayBlockRowCell[] = [];
  for (let i = 0; i < blockRows.length; i++) {
    const blockRow = blockRows[i];
    for (let j = 0; j < blockRow.columns.length; j++) {
      const blockRowColumn = blockRow.columns[j];
      const startDate = blockRowColumn.startDate;
      const endDate = blockRowColumn.endDate;
      const dates = generateDatesFromStartAndEnd(startDate, endDate);
      for (let k = 0; k < dates.length; k++) {
        blockRowCells.push({
          rowId: blockRow.rowId,
          date: dates[k],
          startDate,
          endDate,
          value: blockRowColumn.value,
          extra: blockRowColumn.extra,
        });
      }
    }
  }
  return blockRowCells;
}

export function getFillRowCell(
  fillRowCells: CalendarDayFillRowCell[],
  rowId: string,
  date: string,
): CalendarDayFillRowCell {
  return fillRowCells.filter((i) => i.rowId === rowId && i.date === date)?.[0];
}

export function getBlockRowCell(
  blockRowCells: CalendarDayBlockRowCell[],
  rowId: string,
  date: string,
): CalendarDayBlockRowCell {
  return blockRowCells.filter((i) => i.rowId === rowId && i.date === date)?.[0];
}

export function generateOccupiedTableCells(
  occupiedRows: CalendarOccupiedRowProp[],
): CalendarDayOccupiedRowCell[] {
  const occupiedRowCells: CalendarDayOccupiedRowCell[] = [];
  for (let i = 0; i < occupiedRows.length; i++) {
    const occupiedRow = occupiedRows[i];
    for (let j = 0; j < occupiedRow.columns.length; j++) {
      const occupiedRowColumn = occupiedRow.columns[j];
      const startDate = occupiedRowColumn.startDate;
      const endDate = occupiedRowColumn.endDate;
      const dates = generateDatesFromStartAndEnd(startDate, endDate);
      for (let k = 0; k < dates.length; k++) {
        occupiedRowCells.push({
          rowId: occupiedRow.rowId,
          date: dates[k],
          startDate,
          endDate,
          link: occupiedRowColumn.link,
          name: occupiedRowColumn.name,
          text: occupiedRowColumn.text,
          avatar: occupiedRowColumn.avatar,
          color: occupiedRowColumn.color,
          extra: occupiedRowColumn.extra,
        });
      }
    }
  }
  return occupiedRowCells;
}

export function getOccupiedRowCell(
  occupiedRowCells: CalendarDayOccupiedRowCell[],
  rowId: string,
  date: string,
): CalendarDayOccupiedRowCell {
  const matches = occupiedRowCells.filter(
    (i) => i.rowId === rowId && i.date === date,
  );
  return matches?.[matches?.length - 1];
}

export function generateTableCells(
  monthDate: CalendarMonthDate,
  rows: CalendarRowProp[],
  fillRows: CalendarFillRowProp[],
  blockRows: CalendarBlockRowProp[],
  occupiedRows: CalendarOccupiedRowProp[],
): CalendarDayTableCell[] {
  const tableCells: CalendarDayTableCell[] = [];
  const fillRowCells = generateFillTableCells(fillRows);
  const blockRowCells = generateBlockTableCells(blockRows);
  const occupiedRowCells = generateOccupiedTableCells(occupiedRows);
  const allMonthDates = Object.values(monthDate).flat();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowId = row.rowId;
    for (let j = 0; j < allMonthDates.length; j++) {
      const column = allMonthDates[j];
      let value = row.value;
      let status = CalendarCellStatusProp.Normal;
      let startDate = column;
      let endDate = column;
      let extra;
      let occupied;
      const fillRowCell = getFillRowCell(fillRowCells, rowId, column);
      const blockRowCell = getBlockRowCell(blockRowCells, rowId, column);
      const occupiedRowCell = getOccupiedRowCell(
        occupiedRowCells,
        rowId,
        column,
      );
      if (fillRowCell) {
        value = fillRowCell.value;
        status = CalendarCellStatusProp.Normal;
        startDate = fillRowCell.startDate;
        endDate = fillRowCell.endDate;
        extra = fillRowCell.extra;
      }
      if (blockRowCell) {
        value = blockRowCell.value;
        status = CalendarCellStatusProp.Block;
        startDate = blockRowCell.startDate;
        endDate = blockRowCell.endDate;
        extra = blockRowCell.extra;
      }
      if (occupiedRowCell) {
        occupied = {
          startDate: occupiedRowCell.startDate,
          endDate: occupiedRowCell.endDate,
          link: occupiedRowCell.link,
          name: occupiedRowCell.name,
          text: occupiedRowCell.text,
          avatar: occupiedRowCell.avatar,
          color: occupiedRowCell.color,
          extra: occupiedRowCell.extra,
        };
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
        extra,
        occupied,
      });
    }
  }

  return tableCells;
}

export function getTableCell(
  tableCells: CalendarDayTableCell[],
  rowIndex: number,
  columnIndex: number,
): CalendarDayTableCell {
  return tableCells.filter(
    (i) => i.rowIndex === rowIndex && i.columnIndex === columnIndex,
  )?.[0];
}

export function getTableRowCells(
  tableCells: CalendarDayTableCell[],
  rowStartIndex: number,
  rowEndIndex: number,
  columnIndex: number,
): CalendarDayTableCell[] {
  return tableCells.filter(
    (i) =>
      i.rowIndex >= rowStartIndex &&
      i.rowIndex <= rowEndIndex &&
      i.columnIndex === columnIndex,
  );
}

export function getTableColumnCells(
  tableCells: CalendarDayTableCell[],
  columnStartIndex: number,
  columnEndIndex: number,
  rowIndex: number,
): CalendarDayTableCell[] {
  return tableCells.filter(
    (i) =>
      i.columnIndex >= columnStartIndex &&
      i.columnIndex <= columnEndIndex &&
      i.rowIndex === rowIndex,
  );
}

export function returnToToday(props: CalendarDayTableProp) {
  props.setCustomScrollLeft((props.subtractDayNumber - 2) * props.columnWidth);
  props.setShowReturnToToday(false);
}

export function getTableCellOccupiedCondition(
  tableCells: CalendarDayTableCell[],
  rowIndex: number,
  columnIndex: number,
) {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);

  if (tableCell.occupied) {
    const startDate = moment(tableCell.occupied.startDate);
    const date = moment(tableCell.date);
    return startDate.isSame(date, 'day');
  }

  return false;
}

export function getTableCellOccupied(
  tableCells: CalendarDayTableCell[],
  rowIndex: number,
  columnIndex: number,
  props: CalendarDayTableProp,
): CalendarDayTableOccupiedCell {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  const startDate = tableCell.occupied?.startDate;
  const endDate = tableCell.occupied?.endDate;
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

export function onOccupiedClick(
  tableCells: CalendarDayTableCell[],
  rowIndex: number,
  columnIndex: number,
  props: CalendarDayTableProp,
) {
  const occupied = getTableCell(tableCells, rowIndex, columnIndex).occupied;
  if (props.onOccupiedClick && occupied) {
    props.onOccupiedClick(occupied.link);
  }
}
