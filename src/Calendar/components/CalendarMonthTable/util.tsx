import {
  CalendarMonthBlockRowCell,
  CalendarMonthFillRowCell,
  CalendarMonthOccupiedRowCell,
  CalendarMonthTableCell,
  CalendarMonthTableOccupiedCell,
  CalendarMonthTableProp,
  CalendarMonthTableSelection,
} from 'anystay-ui/Calendar/components/CalendarMonthTable/interface';
import {
  CalendarBlockRowProp,
  CalendarCellStatusProp,
  CalendarFillRowProp,
  CalendarMonthDate,
  CalendarMonthlySelectProp,
  CalendarOccupiedRowProp,
  CalendarRowProp,
} from 'anystay-ui/Calendar/interface';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { OnScrollParams } from 'react-virtualized';

let timer: NodeJS.Timeout;
const longPressThreshold = 500;

export function generateVirtualCell(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
  rowId: string,
  value: string,
) {
  tableCells.push({
    rowIndex,
    columnIndex,
    rowId,
    value,
    virtual: true,
  });
}

export function generateRealCell(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
  rowId: string,
  value: string,
  dMonth: Dayjs,
  day: number,
  fillRowCells: CalendarMonthFillRowCell[],
  blockRowCells: CalendarMonthBlockRowCell[],
  occupiedRowCells: CalendarMonthOccupiedRowCell[],
) {
  const date = dMonth.add(day - 1, 'day').format('YYYY-MM-DD');
  let status = CalendarCellStatusProp.Normal;
  let startDate = date;
  let endDate = date;
  let extra;
  let occupied;
  const fillRowCell = getFillRowCell(fillRowCells, rowId, date);
  const blockRowCell = getBlockRowCell(blockRowCells, rowId, date);
  const occupiedRowCell = getOccupiedRowCell(occupiedRowCells, rowId, date);
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
      extra: occupiedRowCell.extra,
      color: occupiedRowCell.color,
    };
  }

  tableCells.push({
    rowIndex,
    columnIndex,
    rowId,
    date,
    startDate,
    endDate,
    value,
    status,
    day,
    extra,
    occupied,
    virtual: false,
  });
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
): CalendarMonthFillRowCell[] {
  const fillRowCells: CalendarMonthFillRowCell[] = [];
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
): CalendarMonthBlockRowCell[] {
  const blockRowCells: CalendarMonthBlockRowCell[] = [];
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
  fillRowCells: CalendarMonthFillRowCell[],
  rowId: string,
  date: string,
): CalendarMonthFillRowCell {
  return fillRowCells.filter((i) => i.rowId === rowId && i.date === date)?.[0];
}

export function getBlockRowCell(
  blockRowCells: CalendarMonthBlockRowCell[],
  rowId: string,
  date: string,
): CalendarMonthBlockRowCell {
  return blockRowCells.filter((i) => i.rowId === rowId && i.date === date)?.[0];
}

export function generateOccupiedTableCells(
  occupiedRows: CalendarOccupiedRowProp[],
): CalendarMonthOccupiedRowCell[] {
  const occupiedRowCells: CalendarMonthOccupiedRowCell[] = [];
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
          extra: occupiedRowColumn.extra,
          color: occupiedRowColumn.color,
        });
      }
    }
  }
  return occupiedRowCells;
}

export function getOccupiedRowCell(
  occupiedRowCells: CalendarMonthOccupiedRowCell[],
  rowId: string,
  date: string,
): CalendarMonthOccupiedRowCell {
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
): CalendarMonthTableCell[] {
  const tableCells: CalendarMonthTableCell[] = [];
  const allMonths = Object.keys(monthDate);

  if (rows.length > 0) {
    const row = rows[0];
    const rowId = row.rowId;
    const value = row.value;
    let rowIndex = -1;
    const fillRowCells = generateFillTableCells(
      fillRows.filter((i) => i.rowId === rowId),
    );
    const blockRowCells = generateBlockTableCells(
      blockRows.filter((i) => i.rowId === rowId),
    );
    const occupiedRowCells = generateOccupiedTableCells(
      occupiedRows.filter((i) => i.rowId === rowId),
    );
    for (let i = 0; i < allMonths.length; i++) {
      rowIndex = rowIndex + 1;
      const month = allMonths[i];
      const dMonth = dayjs(month);

      // first row
      generateVirtualCell(
        tableCells,
        rowIndex,
        0,
        rowId,
        dMonth.format('MMMM YYYY'),
      );

      for (let j = 1; j < 7; j++) {
        generateVirtualCell(tableCells, rowIndex, j, rowId, '');
      }

      // rest row
      const daysInMonth = dMonth.daysInMonth();
      const startDay = dMonth.startOf('month').day();
      rowIndex = rowIndex + 1;

      for (let j = 0; j < startDay; j++) {
        generateVirtualCell(tableCells, rowIndex, j, rowId, '');
      }
      for (let j = startDay; j < 7; j++) {
        generateRealCell(
          tableCells,
          rowIndex,
          j,
          rowId,
          value,
          dMonth,
          j - startDay + 1,
          fillRowCells,
          blockRowCells,
          occupiedRowCells,
        );
      }

      const rowNumber = Math.ceil((daysInMonth - (7 - startDay)) / 7);

      for (let j = 1; j <= rowNumber; j++) {
        rowIndex = rowIndex + 1;

        if (j !== rowNumber) {
          for (let k = 0; k < 7; k++) {
            generateRealCell(
              tableCells,
              rowIndex,
              k,
              rowId,
              value,
              dMonth,
              7 - startDay + 1 + k + (j - 1) * 7,
              fillRowCells,
              blockRowCells,
              occupiedRowCells,
            );
          }
        } else {
          for (let k = 0; k < 7; k++) {
            const day = 7 - startDay + 1 + k + (j - 1) * 7;
            if (day > daysInMonth) {
              generateVirtualCell(tableCells, rowIndex, k, rowId, '');
            } else {
              generateRealCell(
                tableCells,
                rowIndex,
                k,
                rowId,
                value,
                dMonth,
                day,
                fillRowCells,
                blockRowCells,
                occupiedRowCells,
              );
            }
          }
        }
      }
    }
  }

  return tableCells;
}

export function getTableCell(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
): CalendarMonthTableCell {
  return tableCells.filter(
    (i) => i.rowIndex === rowIndex && i.columnIndex === columnIndex,
  )?.[0];
}

export function getColumnBackgroundSelectedStyle(
  rowIndex: number,
  columnIndex: number,
  selection: CalendarMonthTableSelection,
): string {
  const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } =
    selection;

  if (rowStartIndex !== rowEndIndex) {
    if (
      rowEndIndex !== -1 &&
      columnEndIndex !== -1 &&
      ((rowIndex === rowStartIndex &&
        columnIndex >= columnStartIndex &&
        columnIndex < 7) ||
        (rowIndex > rowStartIndex &&
          rowIndex < rowEndIndex &&
          columnIndex >= 0 &&
          columnIndex < 7) ||
        (rowIndex === rowEndIndex &&
          columnIndex >= 0 &&
          columnIndex <= columnEndIndex))
    ) {
      return 'calendar-month-table-row-column-selected-background-container';
    }
  } else {
    if (
      rowEndIndex !== -1 &&
      columnEndIndex !== -1 &&
      columnIndex >= columnStartIndex &&
      columnIndex <= columnEndIndex &&
      rowIndex >= rowStartIndex &&
      rowIndex <= rowEndIndex
    ) {
      return 'calendar-month-table-row-column-selected-background-container';
    }
  }

  return '';
}

export function getCurrentColumnBorderSelectedStyle(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
) {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  if (tableCell.date === dayjs().format('YYYY-MM-DD')) {
    return `calendar-month-table-row-column-current-selected-border-container`;
  }
  return '';
}

export function getColumnDisabledStyle(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
): string {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);

  if (
    tableCell &&
    !tableCell.virtual &&
    dayjs(tableCell.date).isBefore(dayjs().subtract(1, 'day'))
  ) {
    return 'calendar-month-table-row-column-disabled-container';
  }

  return '';
}

export function getColumBlockStyle(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
): string {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  if (tableCell?.status === CalendarCellStatusProp.Block) {
    return 'calendar-month-table-row-column-block-container';
  }

  return '';
}

export function getColumnVirtualStyle(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
): string {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);

  if (tableCell && tableCell.virtual) {
    return 'calendar-month-table-row-column-virtual-container';
  }

  return '';
}

export function getTableCellVirtualCondition(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
) {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  return tableCell?.virtual;
}

export function getSelectedTableStartEndCell(
  tableCells: CalendarMonthTableCell[],
  rowStartIndex: number,
  rowEndIndex: number,
  columnStartIndex: number,
  columnEndIndex: number,
): CalendarMonthTableCell[] {
  // const numberOfColumns = 7; // hard coded 7

  return tableCells.filter((i) => {
    const isWithinRowRange =
      (i.rowIndex === rowStartIndex && i.columnIndex === columnStartIndex) || // Row 3, columns 4 to 6
      (i.rowIndex === rowEndIndex && i.columnIndex === columnEndIndex); // Row 4, columns 0 to 2

    return isWithinRowRange;
  });
}

export function getTableColumnCellsByStartAndEnd(
  tableCells: CalendarMonthTableCell[],
  columnStartIndex: number,
  columnEndIndex: number,
  rowStartIndex: number,
  rowEndIndex: number,
): CalendarMonthTableCell[] {
  return tableCells.filter(
    (i) =>
      i.columnIndex >= columnStartIndex &&
      i.columnIndex <= columnEndIndex &&
      i.rowIndex >= rowStartIndex &&
      i.rowIndex <= rowEndIndex,
  );
}

export function getTableColumnCells(
  tableCells: CalendarMonthTableCell[],
  rowStartIndex: number,
  rowEndIndex: number,
  columnStartIndex: number,
  columnEndIndex: number,
  rowIndex: number,
): CalendarMonthTableCell[] {
  if (rowStartIndex !== rowEndIndex) {
    if (rowIndex === rowStartIndex) {
      return tableCells.filter(
        (i) =>
          i.columnIndex >= columnStartIndex &&
          i.columnIndex < 7 &&
          i.rowIndex === rowIndex,
      );
    } else if (rowIndex > rowStartIndex && rowIndex < rowEndIndex) {
      return tableCells.filter(
        (i) =>
          i.columnIndex >= 0 && i.columnIndex < 7 && i.rowIndex === rowIndex,
      );
    } else if (rowIndex === rowEndIndex) {
      return tableCells.filter(
        (i) =>
          i.columnIndex >= 0 &&
          i.columnIndex <= columnEndIndex &&
          i.rowIndex === rowIndex,
      );
    } else {
      return [];
    }
  } else {
    return tableCells.filter(
      (i) =>
        i.columnIndex >= columnStartIndex &&
        i.columnIndex <= columnEndIndex &&
        i.rowIndex === rowIndex,
    );
  }
}

export function onScrollDate(
  params: OnScrollParams,
  rowHeight: number,
  tableCells: CalendarMonthTableCell[],
  props: CalendarMonthTableProp,
) {
  const number = Math.round(params.scrollTop / rowHeight);
  const tableCell = getTableCell(tableCells, number, 0);
  if (tableCell?.virtual && tableCell?.value) {
    props.setMonthTitle(tableCell.value);
    const dayjsObj = dayjs(tableCell.value, 'MMMM YYYY');
    props.setMonthlyTitleSelectedDate(dayjsObj);
  } else if (tableCell?.date) {
    const date = new Date(tableCell.date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    const formattedDate: string = date.toLocaleDateString('en-US', options);
    const dayjsObj = dayjs(formattedDate, 'MMMM YYYY');
    props.setMonthlyTitleSelectedDate(dayjsObj);
    props.setMonthTitle(formattedDate);
  }
}
export function showReturnToToday(
  cellHeight: number,
  customScrollTop: number,
  todayScrollTop: number,
  setShowReturnToday: Dispatch<SetStateAction<boolean>>,
) {
  if (
    customScrollTop > todayScrollTop + cellHeight ||
    customScrollTop < todayScrollTop - cellHeight * 2
  ) {
    setShowReturnToday(true);
  } else {
    setShowReturnToday(false);
  }
}

export function onMouseDown(
  rowIndex: number,
  columnIndex: number,
  selectionVisible: boolean,
  setSelectionVisible: Dispatch<SetStateAction<boolean>>,
  setSelection: Dispatch<SetStateAction<CalendarMonthTableSelection>>,
  tableCells: CalendarMonthTableCell[],
  firstSelection: React.MutableRefObject<CalendarMonthTableSelection>,
) {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);

  if (
    tableCell &&
    !tableCell.virtual &&
    dayjs(tableCell.date).isAfter(dayjs().subtract(1, 'day'))
  ) {
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
      firstSelection.current = {
        rowStartIndex: rowIndex,
        rowEndIndex: rowIndex,
        rowCurrentIndex: rowIndex,
        columnStartIndex: columnIndex,
        columnEndIndex: columnIndex,
        columnCurrentIndex: columnIndex,
      };
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
  selection: CalendarMonthTableSelection,
  setSelection: Dispatch<SetStateAction<CalendarMonthTableSelection>>,
  tableCells: CalendarMonthTableCell[],
  firstSelection: React.MutableRefObject<CalendarMonthTableSelection>,
) {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  if (
    tableCell &&
    !tableCell.virtual &&
    dayjs(tableCell.date).isAfter(dayjs().subtract(1, 'day'))
  ) {
    if (selectionVisible) {
      const currentRow = selection.rowCurrentIndex;
      const rowStart = rowIndex >= currentRow ? currentRow : rowIndex;
      const rowEnd = !(rowIndex >= currentRow) ? currentRow : rowIndex;

      const currentCol = selection.columnCurrentIndex;

      let columnStart = -1;
      if (rowIndex < firstSelection.current.rowStartIndex) {
        columnStart = columnIndex;
      } else if (rowIndex === firstSelection.current.rowStartIndex) {
        if (columnIndex < firstSelection.current.columnStartIndex) {
          columnStart = columnIndex;
        } else {
          columnStart = firstSelection.current.columnStartIndex;
        }
      } else {
        columnStart = firstSelection.current.columnStartIndex;
      }
      let columnEnd = -1;

      if (rowIndex < firstSelection.current.rowEndIndex) {
        columnEnd = firstSelection.current.columnEndIndex;
      } else if (rowIndex === firstSelection.current.rowEndIndex) {
        if (columnIndex < firstSelection.current.columnEndIndex) {
          columnEnd = firstSelection.current.columnEndIndex;
        } else {
          columnEnd = columnIndex;
        }
      } else {
        columnEnd = columnIndex;
      }

      // const columnStart = rowIndex  firstSelect.rowStartIndex && columnIndex >= firstSelect.columnStartIndex ? firstSelect.columnStartIndex : columnIndex;
      // const columnEnd = !(columnIndex >= currentCol) ? currentCol : columnIndex;

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
  selection: CalendarMonthTableSelection,
  tableCells: CalendarMonthTableCell[],
  onSelect?: (prop: CalendarMonthlySelectProp) => void,
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
      const selectProp: CalendarMonthlySelectProp = {
        startDate: '',
        endDate: '',
        cells: [],
      };

      const selectedTableCells = getSelectedTableStartEndCell(
        tableCells,
        rowStartIndex,
        rowEndIndex,
        columnStartIndex,
        columnEndIndex,
      );

      if (selectedTableCells.length === 2) {
        selectProp.startDate = selectedTableCells[0].date || '';
        selectProp.endDate = selectedTableCells[1].date || '';
      } else if (selectedTableCells.length === 1) {
        selectProp.startDate = selectedTableCells[0].date || '';
        selectProp.endDate = selectedTableCells[0].date || '';
      }

      for (let i = rowStartIndex; i <= rowEndIndex; i++) {
        const cells = getTableColumnCells(
          tableCells,
          rowStartIndex,
          rowEndIndex,
          columnStartIndex,
          columnEndIndex,
          i,
        );
        for (let j = 0; j < cells.length; j++) {
          const cell = cells[j];
          if (!cell.virtual) {
            selectProp.cells.push({
              status: cell.status || CalendarCellStatusProp.Normal,
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

export function onSectionRenderJumpToToday(
  init: React.MutableRefObject<boolean>,
  todayScrollTop: React.MutableRefObject<number>,
  monthDate: CalendarMonthDate,
  setCustomScrollTop: Dispatch<SetStateAction<number>>,
  width: number,
) {
  //width / 7 = row height
  if (init.current) return;
  function getRowsUntilThisMonth(year: number, month: number) {
    // 获取该月的第一天
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 星期天是0，星期一是1，...
    // 获取该月的最后一天
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate(); // 获取该月天数
    // 计算需要多少行（周）
    const totalCells = totalDaysInMonth + firstDayOfWeek; // 天数 + 偏移量
    const numberOfRows = Math.ceil(totalCells / 7); // 每行7天
    return numberOfRows;
  }
  function getRowsUntilToday() {
    // 获取该月的第一天
    const year = dayjs().year(); // Returns the year as a number
    const month = dayjs().month(); // Returns the month (0-based: 0 = January, 11 = December)
    const day = dayjs().date(); // Returns the day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 星期天是0，星期一是1...
    // 计算今天之前的总单元格数，包括今天
    const totalCellsUntilToday = day + firstDayOfWeek;
    // 计算今天之前的行数
    const rowsUntilToday = Math.ceil(totalCellsUntilToday / 7);
    return rowsUntilToday;
  }

  const months = Object.keys(monthDate);
  let numberOfRow = 0;
  for (let i = 0; i < months.length; i++) {
    for (let j = 0; j < monthDate[months[i]].length; j++) {
      if (monthDate[months[i]][j] === dayjs().format('YYYY-MM-DD')) {
        numberOfRow += getRowsUntilToday();
        let scrollTop = numberOfRow * (width / 7);
        setCustomScrollTop(scrollTop);
        todayScrollTop.current = scrollTop;
        init.current = true;
        return;
      }
    }
    const year = Number(months[i].split('-')[0]);
    const month = Number(months[i].split('-')[1]) - 1;
    numberOfRow += getRowsUntilThisMonth(year, month) + 1; //title take 1 row
  }
}

export function getTableCellStartOccupiedCondition(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
) {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  const tableCellDate = dayjs(tableCell.date);

  if (tableCell.occupied) {
    const occupiedStartDate = dayjs(tableCell.occupied?.startDate);
    const occupiedEndDate = dayjs(tableCell.occupied?.endDate);
    dayjs.extend(isBetween);
    const isBetweenRange =
      (tableCellDate.isSame(occupiedStartDate, 'day') ||
        tableCellDate.isAfter(occupiedStartDate, 'day')) &&
      (tableCellDate.isSame(occupiedEndDate, 'day') ||
        tableCellDate.isBefore(occupiedEndDate, 'day'));
    if (isBetweenRange) {
      return true;
    }
    return false;
  }
  return false;
}

function calculateTranslateX(
  hourColumnWidth: number,
  occupiedStartDate: dayjs.Dayjs,
  tableCellDate: dayjs.Dayjs,
) {
  const hoursDifference = occupiedStartDate.diff(
    tableCellDate.startOf('day'),
    'hour',
  );
  return hoursDifference * hourColumnWidth;
}
export function getTableCellOccupied(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
  columnWidth: number,
): CalendarMonthTableOccupiedCell {
  const hourColumnWidth = columnWidth / 24;
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  const tableCellDate = dayjs(tableCell.date);
  const occupiedStartDate = tableCell.occupied?.startDate;
  const occupiedEndDate = tableCell.occupied?.endDate;
  dayjs.extend(isBetween);
  const isStart = tableCellDate.isSame(occupiedStartDate, 'day');
  const isEnd = tableCellDate.isSame(occupiedEndDate, 'day');
  const isBetweenRange =
    (tableCellDate.isSame(occupiedStartDate, 'day') ||
      tableCellDate.isAfter(occupiedStartDate, 'day')) &&
    (tableCellDate.isSame(occupiedEndDate, 'day') ||
      tableCellDate.isBefore(occupiedEndDate, 'day'));
  if (isBetweenRange) {
    if (isStart && isEnd) {
      //same day booking
      const widthHours = moment
        .duration(moment(occupiedEndDate).diff(moment(occupiedStartDate)))
        .asHours();
      let width = hourColumnWidth * widthHours;
      const left = hourColumnWidth * moment(occupiedStartDate).hour();
      return {
        width,
        left,
        translateX: 0,
      };
    }
    if (isStart) {
      const tableCellEndDate = moment(tableCell.date).endOf('day');
      const widthHours = moment
        .duration(tableCellEndDate.diff(moment(occupiedStartDate)))
        .asHours();
      let width = hourColumnWidth * widthHours;
      const left = hourColumnWidth * moment(occupiedStartDate).hour();
      return {
        width,
        left,
        borderRadiusCornerRightNoNeed: true,
        translateX: 0,
      };
    } else if (isEnd) {
      const tableCellStartDate = moment(tableCell.date).startOf('day');
      const widthHours = -moment
        .duration(tableCellStartDate.diff(moment(occupiedEndDate)))
        .asHours();
      let width = hourColumnWidth * widthHours;
      const right = hourColumnWidth * (24 - moment(occupiedEndDate).hour());
      return {
        width,
        right,
        borderRadiusCornerLeftNoNeed: true,
        translateX: calculateTranslateX(
          hourColumnWidth,
          dayjs(occupiedStartDate),
          dayjs(tableCell.date),
        ),
      };
    } else {
      return {
        width: columnWidth,
        borderRadiusCornerBothNoNeed: true,
        translateX: calculateTranslateX(
          hourColumnWidth,
          dayjs(occupiedStartDate),
          dayjs(tableCell.date),
        ),
      };
    }
  }

  return { width: 0 };
}

export function getOccupiedBorderStyling(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
  columnWidth: number,
) {
  const res = getTableCellOccupied(
    tableCells,
    rowIndex,
    columnIndex,
    columnWidth,
  );
  if (res.borderRadiusCornerRightNoNeed) {
    return {
      borderBottomRightRadius: '0',
      borderTopRightRadius: '0',
    };
  } else if (res.borderRadiusCornerLeftNoNeed) {
    return {
      borderBottomLeftRadius: '0',
      borderTopLeftRadius: '0',
    };
  } else if (res.borderRadiusCornerBothNoNeed) {
    return {
      borderBottomRightRadius: '0',
      borderTopRightRadius: '0',
      borderBottomLeftRadius: '0',
      borderTopLeftRadius: '0',
    };
  }
}

export function onOccupiedClick(
  tableCells: CalendarMonthTableCell[],
  rowIndex: number,
  columnIndex: number,
  props: CalendarMonthTableProp,
) {
  const occupied = getTableCell(tableCells, rowIndex, columnIndex).occupied;
  if (props.onOccupiedClick && occupied) {
    props.onOccupiedClick(occupied.link);
  }
}
