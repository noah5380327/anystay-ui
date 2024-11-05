import {
  CalendarMonthBlockRowCell,
  CalendarMonthFillRowCell,
  DatePickerTableCell,
  DatePickerTableProp,
  DatePickerTableSelection,
} from 'anystay-ui/DatePicker/components/DatePickerTable/interface';
import {
  CalendarCellStatusProp,
  DatePickerMonthDate,
  DatePickerSelectProp,
} from 'anystay-ui/DatePicker/interface';
import dayjs, { Dayjs } from 'dayjs';

import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { OnScrollParams } from 'react-virtualized';

let timer: NodeJS.Timeout;
const longPressThreshold = 500;

export function generateVirtualCell(
  tableCells: DatePickerTableCell[],
  rowIndex: number,
  columnIndex: number,
  value: string,
) {
  tableCells.push({
    rowIndex,
    columnIndex,
    value,
    virtual: true,
  });
}

export function generateRealCell(
  tableCells: DatePickerTableCell[],
  rowIndex: number,
  columnIndex: number,
  value: string,
  dMonth: Dayjs,
  day: number,
  blockRowCells: CalendarMonthBlockRowCell[],
) {
  const date = dMonth.add(day - 1, 'day').format('YYYY-MM-DD');
  let status = CalendarCellStatusProp.Normal;
  const blockRowCell = getBlockRowCell(blockRowCells, date);

  if (blockRowCell) {
    status = CalendarCellStatusProp.Block;
  }

  tableCells.push({
    rowIndex,
    columnIndex,
    date,
    value,
    status,
    day,
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

export function generateBlockTableCells(
  blockRows: string[],
): CalendarMonthBlockRowCell[] {
  const blockRowCells: CalendarMonthBlockRowCell[] = [];
  for (let k = 0; k < blockRows.length; k++) {
    blockRowCells.push({
      date: blockRows[k],
      value: blockRows[k],
    });
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
  date: string,
): CalendarMonthBlockRowCell {
  return blockRowCells.filter((i) => i.date === date)?.[0];
}

export function generateTableCells(
  monthDate: DatePickerMonthDate,
  blockRows: string[],
): DatePickerTableCell[] {
  const tableCells: DatePickerTableCell[] = [];
  const allMonths = Object.keys(monthDate);

  let rowIndex = -1;

  const blockRowCells = generateBlockTableCells(blockRows);

  for (let i = 0; i < allMonths.length; i++) {
    rowIndex = rowIndex + 1;
    const month = allMonths[i];
    const dMonth = dayjs(month);

    // first row
    generateVirtualCell(tableCells, rowIndex, 0, dMonth.format('MMMM YYYY'));

    for (let j = 1; j < 7; j++) {
      generateVirtualCell(tableCells, rowIndex, j, '');
    }

    // rest row
    const daysInMonth = dMonth.daysInMonth();
    const startDay = dMonth.startOf('month').day();
    rowIndex = rowIndex + 1;

    for (let j = 0; j < startDay; j++) {
      generateVirtualCell(tableCells, rowIndex, j, '');
    }
    for (let j = startDay; j < 7; j++) {
      generateRealCell(
        tableCells,
        rowIndex,
        j,
        '',
        dMonth,
        j - startDay + 1,
        blockRowCells,
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
            '',
            dMonth,
            7 - startDay + 1 + k + (j - 1) * 7,
            blockRowCells,
          );
        }
      } else {
        for (let k = 0; k < 7; k++) {
          const day = 7 - startDay + 1 + k + (j - 1) * 7;
          if (day > daysInMonth) {
            generateVirtualCell(tableCells, rowIndex, k, '');
          } else {
            generateRealCell(
              tableCells,
              rowIndex,
              k,
              '',
              dMonth,
              day,
              blockRowCells,
            );
          }
        }
      }
    }
  }

  return tableCells;
}

export function getTableCell(
  tableCells: DatePickerTableCell[],
  rowIndex: number,
  columnIndex: number,
): DatePickerTableCell {
  return tableCells.filter(
    (i) => i.rowIndex === rowIndex && i.columnIndex === columnIndex,
  )?.[0];
}

export function getColumnBackgroundSelectedStyle(
  rowIndex: number,
  columnIndex: number,
  selection: DatePickerTableSelection,
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
  tableCells: DatePickerTableCell[],
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
  tableCells: DatePickerTableCell[],
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
  tableCells: DatePickerTableCell[],
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
  tableCells: DatePickerTableCell[],
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
  tableCells: DatePickerTableCell[],
  rowIndex: number,
  columnIndex: number,
) {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  return tableCell?.virtual;
}

export function getSelectedTableStartEndCell(
  tableCells: DatePickerTableCell[],
  rowStartIndex: number,
  rowEndIndex: number,
  columnStartIndex: number,
  columnEndIndex: number,
): DatePickerTableCell[] {
  // const numberOfColumns = 7; // hard coded 7

  return tableCells.filter((i) => {
    const isWithinRowRange =
      (i.rowIndex === rowStartIndex && i.columnIndex === columnStartIndex) || // Row 3, columns 4 to 6
      (i.rowIndex === rowEndIndex && i.columnIndex === columnEndIndex); // Row 4, columns 0 to 2

    return isWithinRowRange;
  });
}

export function getTableColumnCellsByStartAndEnd(
  tableCells: DatePickerTableCell[],
  columnStartIndex: number,
  columnEndIndex: number,
  rowStartIndex: number,
  rowEndIndex: number,
): DatePickerTableCell[] {
  return tableCells.filter(
    (i) =>
      i.columnIndex >= columnStartIndex &&
      i.columnIndex <= columnEndIndex &&
      i.rowIndex >= rowStartIndex &&
      i.rowIndex <= rowEndIndex,
  );
}

export function getTableColumnCells(
  tableCells: DatePickerTableCell[],
  rowStartIndex: number,
  rowEndIndex: number,
  columnStartIndex: number,
  columnEndIndex: number,
  rowIndex: number,
): DatePickerTableCell[] {
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
  tableCells: DatePickerTableCell[],
  props: DatePickerTableProp,
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

export function onMouseDown(
  rowIndex: number,
  columnIndex: number,
  selectionVisible: boolean,
  setSelectionVisible: Dispatch<SetStateAction<boolean>>,
  setSelection: Dispatch<SetStateAction<DatePickerTableSelection>>,
  selection: DatePickerTableSelection,
  tableCells: DatePickerTableCell[],
  firstSelection: React.MutableRefObject<DatePickerTableSelection>,
) {
  //if desktop user
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) return;

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
export function onTouchStart(
  rowIndex: number,
  columnIndex: number,
  selectionVisible: boolean,
  setSelectionVisible: Dispatch<SetStateAction<boolean>>,
  setSelection: Dispatch<SetStateAction<DatePickerTableSelection>>,
  selection: DatePickerTableSelection,
  tableCells: DatePickerTableCell[],
  firstSelection: React.MutableRefObject<DatePickerTableSelection>,
) {
  //for mobile touch screen user
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (!isMobile) return;

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
    } else {
      //if mobile, second click is select the end cell, same logic as the onmouseover
      onMouseOver(
        rowIndex,
        columnIndex,
        selectionVisible,
        selection,
        setSelection,
        tableCells,
        firstSelection,
      );
      setSelectionVisible(false);
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
  selection: DatePickerTableSelection,
  setSelection: Dispatch<SetStateAction<DatePickerTableSelection>>,
  tableCells: DatePickerTableCell[],
  firstSelection: React.MutableRefObject<DatePickerTableSelection>,
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
  selection: DatePickerTableSelection,
  tableCells: DatePickerTableCell[],
  onSelect?: (prop: DatePickerSelectProp) => void,
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
      const selectProp: DatePickerSelectProp = {
        startDate: '',
        endDate: '',
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
      onSelect(selectProp);
    }
  }
}

export function onSectionRenderJumpToToday(
  init: React.MutableRefObject<boolean>,
  todayScrollTop: React.MutableRefObject<number>,
  monthDate: DatePickerMonthDate,
  setCustomScrollTop: Dispatch<SetStateAction<number>>,
  cellHeight: number,
) {
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
        let scrollTop = numberOfRow * cellHeight;
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
