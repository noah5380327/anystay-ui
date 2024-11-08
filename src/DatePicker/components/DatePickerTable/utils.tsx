import {
  DatePickerBlockCell,
  DatePickerCheckoutOnlyCell,
  DatePickerTableCell,
  DatePickerTableProp,
  DatePickerTableSelection,
} from 'anystay-ui/DatePicker/components/DatePickerTable/interface';
import {
  DatePickerCellStatusProp,
  DatePickerMonthDate,
  DatePickerSelectProp,
} from 'anystay-ui/DatePicker/interface';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { OnScrollParams } from 'react-virtualized';

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
  blockCells: DatePickerBlockCell[],
  checkoutOnlyCells: DatePickerCheckoutOnlyCell[],
) {
  const date = dMonth.add(day - 1, 'day').format('YYYY-MM-DD');
  let status = DatePickerCellStatusProp.Normal;
  const blockCell = getBlockCell(blockCells, date);
  const checkoutOnlyCell = getCheckoutOnlyCell(checkoutOnlyCells, date);

  if (blockCell) {
    status = DatePickerCellStatusProp.Block;
  }
  if (checkoutOnlyCell) {
    status = DatePickerCellStatusProp.CheckoutOnly;
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
  blockDates: string[],
): DatePickerBlockCell[] {
  const blockCells: DatePickerBlockCell[] = [];
  for (let k = 0; k < blockDates.length; k++) {
    blockCells.push({
      date: blockDates[k],
      value: blockDates[k],
    });
  }
  return blockCells;
}
export function generateCheckoutOnlyTableCells(
  checkoutOnlyDates: string[],
): DatePickerCheckoutOnlyCell[] {
  const checkoutOnlyCells: DatePickerBlockCell[] = [];
  for (let k = 0; k < checkoutOnlyDates.length; k++) {
    checkoutOnlyCells.push({
      date: checkoutOnlyDates[k],
      value: checkoutOnlyDates[k],
    });
  }
  return checkoutOnlyCells;
}

export function getBlockCell(
  blockCells: DatePickerBlockCell[],
  date: string,
): DatePickerBlockCell {
  return blockCells.filter((i) => i.date === date)?.[0];
}
export function getCheckoutOnlyCell(
  checkoutOnlyCells: DatePickerCheckoutOnlyCell[],
  date: string,
): DatePickerCheckoutOnlyCell {
  return checkoutOnlyCells.filter((i) => i.date === date)?.[0];
}

export function generateTableCells(
  monthDate: DatePickerMonthDate,
  blockDates: string[],
  checkoutOnlyDates: string[],
): DatePickerTableCell[] {
  const tableCells: DatePickerTableCell[] = [];
  const allMonths = Object.keys(monthDate);

  let rowIndex = -1;

  const blockCells = generateBlockTableCells(blockDates);
  const checkoutOnlyCells = generateCheckoutOnlyTableCells(checkoutOnlyDates);

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
        blockCells,
        checkoutOnlyCells,
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
            blockCells,
            checkoutOnlyCells,
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
              blockCells,
              checkoutOnlyCells,
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
      return 'date-picker-table-row-column-selected-background-container';
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
      return 'date-picker-table-row-column-selected-background-container';
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
    return `date-picker-table-row-column-current-selected-border-container`;
  }
  return '';
}

function checkIsCellDisabledAfterFirstSelection(
  tableCell: DatePickerTableCell,
  firstSelection: React.MutableRefObject<DatePickerTableSelection>,
  secondSelection: React.MutableRefObject<DatePickerTableSelection> | null,
  minRange: number,
  maxRange: number,
  tableCells: DatePickerTableCell[],
  blockCells: string[],
  checkoutOnlyCells: string[],
) {
  //if virtual cell, no need to disable
  if (tableCell.virtual || !tableCell.date) return false;

  //if no firstSelection, no need to disable cells after first selection
  if (firstSelection.current.rowCurrentIndex === -1) return false;

  // if both selection is made, no need to disable cells after selection
  if (secondSelection) {
    if (
      firstSelection.current.rowCurrentIndex !== -1 &&
      secondSelection.current.rowCurrentIndex !== -1
    ) {
      return false;
    }
  }

  // check disable after first selection
  const firstSelectionCell = getTableCell(
    tableCells,
    firstSelection.current.rowCurrentIndex,
    firstSelection.current.columnCurrentIndex,
  );

  const { date: cellDate } = tableCell;
  const { date: startDate } = firstSelectionCell;

  // Parse dates using dayjs
  const startDayjs = dayjs(startDate);
  const cellDayjs = dayjs(cellDate);

  // Only consider cells after the start cell
  if (cellDayjs.isSameOrBefore(startDayjs, 'day')) return true;

  // Determine the minimum and maximum range dates
  const minRangeEndDate = startDayjs.add(minRange - 1, 'day');
  let maxRangeEndDate = startDayjs.add(maxRange, 'day');
  // Find the closest blocked date after startDayjs
  const closestBlockedDateAfterStart = blockCells
    .map((dateStr) => dayjs(dateStr)) // Convert strings to dayjs objects
    .filter((blockedDate) => blockedDate.isAfter(startDayjs, 'day')) // Keep only dates after startDayjs
    .sort((a, b) => a.diff(b)) // Sort to find the closest date
    .shift(); // Get the first (closest) date in the sorted array
  const closestCheckoutDateAfterStart = checkoutOnlyCells
    .map((dateStr) => dayjs(dateStr)) // Convert strings to dayjs objects
    .filter((blockedDate) => blockedDate.isAfter(startDayjs, 'day')) // Keep only dates after startDayjs
    .sort((a, b) => a.diff(b)) // Sort to find the closest date
    .shift(); // Get the first (closest) date in the sorted array

  // Determine which of the closestBlockedDate or closestCheckoutDate is closer to startDayjs
  const closestDateAfterStart =
    closestBlockedDateAfterStart && closestCheckoutDateAfterStart
      ? closestBlockedDateAfterStart.isBefore(
          closestCheckoutDateAfterStart,
          'day',
        )
        ? closestBlockedDateAfterStart
        : closestCheckoutDateAfterStart
      : closestBlockedDateAfterStart || closestCheckoutDateAfterStart;

  // Update maxRangeEndDate to the closest date if it’s within the range
  if (
    closestDateAfterStart &&
    closestDateAfterStart.isBefore(maxRangeEndDate, 'day')
  ) {
    maxRangeEndDate = closestDateAfterStart;
  }

  // Disable cells if they fall outside the allowed range after the start cell
  return (
    cellDayjs.isSameOrBefore(minRangeEndDate, 'day') ||
    cellDayjs.isAfter(maxRangeEndDate, 'day')
  );
}

export function getColumnStatusStyle(
  tableCells: DatePickerTableCell[],
  rowIndex: number,
  columnIndex: number,
  firstSelection: React.MutableRefObject<DatePickerTableSelection>,
  secondSelection: React.MutableRefObject<DatePickerTableSelection>,
  minRange: number,
  maxRange: number,
  blockCells: string[],
  checkoutOnlyCells: string[],
): string {
  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);

  if (tableCell && !tableCell.virtual) {
    if (dayjs(tableCell.date).isBefore(dayjs().subtract(1, 'day'))) {
      return 'date-picker-table-row-column-disabled-container';
    } else if (dayjs(tableCell.date).isAfter(dayjs().subtract(1, 'day'))) {
      if (tableCell.status === 'Block') {
        return 'date-picker-table-row-column-disabled-container';
      }
      if (tableCell.status === 'CheckoutOnly') {
        return 'date-picker-table-row-column-checkoutOnly-container';
      }
      if (
        checkIsCellDisabledAfterFirstSelection(
          tableCell,
          firstSelection,
          secondSelection,
          minRange,
          maxRange,
          tableCells,
          blockCells,
          checkoutOnlyCells,
        )
      ) {
        return 'date-picker-table-row-column-disabled-container';
      }
    }
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
    return 'date-picker-table-row-column-virtual-container';
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

//clear both first and second selection
function clearBothSelection(
  firstSelection: React.MutableRefObject<DatePickerTableSelection>,
  secondSelection: React.MutableRefObject<DatePickerTableSelection>,
) {
  const defaultValue = {
    rowStartIndex: -1,
    rowEndIndex: -1,
    rowCurrentIndex: -1,
    columnStartIndex: -1,
    columnEndIndex: -1,
    columnCurrentIndex: -1,
  };
  firstSelection.current = defaultValue;
  secondSelection.current = defaultValue;
}

export function onMouseDown(
  rowIndex: number,
  columnIndex: number,
  selectionVisible: boolean,
  setSelectionVisible: Dispatch<SetStateAction<boolean>>,
  setSelection: Dispatch<SetStateAction<DatePickerTableSelection>>,
  tableCells: DatePickerTableCell[],
  firstSelection: React.MutableRefObject<DatePickerTableSelection>,
  secondSelection: React.MutableRefObject<DatePickerTableSelection>,
  minRange: number,
  maxRange: number,
  blockCells: string[],
  checkoutOnlyCells: string[],
  setCheckoutOnlyCellToolTipActiveCell: React.Dispatch<
    React.SetStateAction<string>
  >,
) {
  //for desktop user
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) return;

  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  if (tableCell.status === 'Block') return;

  if (
    firstSelection.current.rowCurrentIndex !== -1 &&
    secondSelection.current.rowCurrentIndex !== -1
  ) {
    console.log('clear');
    clearBothSelection(firstSelection, secondSelection);
  }

  //handle tooltip, if this is the first selection, do not allow selection action, display tooltip
  if (
    firstSelection.current.rowCurrentIndex === -1 &&
    tableCell.status === 'CheckoutOnly'
  ) {
    setCheckoutOnlyCellToolTipActiveCell(
      `${tableCell.rowIndex}-${tableCell.columnIndex}`,
    );
    return;
  } else {
    setCheckoutOnlyCellToolTipActiveCell('');
  }

  if (
    tableCell &&
    !tableCell.virtual &&
    dayjs(tableCell.date).isAfter(dayjs().subtract(1, 'day'))
  ) {
    //if clicked disabled cell
    const isCellDisabled = checkIsCellDisabledAfterFirstSelection(
      tableCell,
      firstSelection,
      secondSelection,
      minRange,
      maxRange,
      tableCells,
      blockCells,
      checkoutOnlyCells,
    );
    if (isCellDisabled) {
      return;
    }

    //if click the same cell or click the cell before
    if (firstSelection.current.rowCurrentIndex !== -1) {
      const firstSelectionCellDimension =
        firstSelection.current.rowCurrentIndex * 7 +
        firstSelection.current.columnCurrentIndex;
      const tableCellDimension = tableCell.rowIndex * 7 + tableCell.columnIndex;
      if (tableCellDimension <= firstSelectionCellDimension) {
        return;
      }
    }
    if (!selectionVisible) {
      setSelectionVisible(true);
      const currentSelection = {
        rowStartIndex: rowIndex,
        rowEndIndex: rowIndex,
        rowCurrentIndex: rowIndex,
        columnStartIndex: columnIndex,
        columnEndIndex: columnIndex,
        columnCurrentIndex: columnIndex,
      };
      setSelection(currentSelection);
      firstSelection.current = currentSelection;
    } else {
      secondSelection.current = {
        rowStartIndex: rowIndex,
        rowEndIndex: rowIndex,
        rowCurrentIndex: rowIndex,
        columnStartIndex: columnIndex,
        columnEndIndex: columnIndex,
        columnCurrentIndex: columnIndex,
      };
      setSelectionVisible(false);
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
  secondSelection: React.MutableRefObject<DatePickerTableSelection>,
  minRange: number,
  maxRange: number,
  blockCells: string[],
  checkoutOnlyCells: string[],
  setCheckoutOnlyCellToolTipActiveCell: React.Dispatch<
    React.SetStateAction<string>
  >,
) {
  //for mobile touch screen user
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (!isMobile) return;

  const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
  if (tableCell.status === 'Block') return;

  if (
    firstSelection.current.rowCurrentIndex !== -1 &&
    secondSelection.current.rowCurrentIndex !== -1
  ) {
    clearBothSelection(firstSelection, secondSelection);
  }

  //handle tooltip, if this is the first selection, do not allow selection action, display tooltip
  if (
    firstSelection.current.rowCurrentIndex === -1 &&
    tableCell.status === 'CheckoutOnly'
  ) {
    setCheckoutOnlyCellToolTipActiveCell(
      `${tableCell.rowIndex}-${tableCell.columnIndex}`,
    );
    return;
  } else {
    setCheckoutOnlyCellToolTipActiveCell('');
  }

  if (
    tableCell &&
    !tableCell.virtual &&
    dayjs(tableCell.date).isAfter(dayjs().subtract(1, 'day'))
  ) {
    //if click disabled cell do nothing
    const isCellDisabled = checkIsCellDisabledAfterFirstSelection(
      tableCell,
      firstSelection,
      secondSelection,
      minRange,
      maxRange,
      tableCells,
      blockCells,
      checkoutOnlyCells,
    );
    if (isCellDisabled) {
      return;
    }
    //if click the same cell or click the cell before
    if (firstSelection.current.rowCurrentIndex !== -1) {
      const firstSelectionCellDimension =
        firstSelection.current.rowCurrentIndex * 7 +
        firstSelection.current.columnCurrentIndex;
      const tableCellDimension = tableCell.rowIndex * 7 + tableCell.columnIndex;
      if (tableCellDimension <= firstSelectionCellDimension) {
        return;
      }
    }
    if (firstSelection.current.rowCurrentIndex === -1) {
      const currentSelection = {
        rowStartIndex: rowIndex,
        rowEndIndex: rowIndex,
        rowCurrentIndex: rowIndex,
        columnStartIndex: columnIndex,
        columnEndIndex: columnIndex,
        columnCurrentIndex: columnIndex,
      };
      setSelection(currentSelection);
      firstSelection.current = currentSelection;
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
        minRange,
        maxRange,
        blockCells,
        checkoutOnlyCells,
      );
      secondSelection.current = {
        rowStartIndex: rowIndex,
        rowEndIndex: rowIndex,
        rowCurrentIndex: rowIndex,
        columnStartIndex: columnIndex,
        columnEndIndex: columnIndex,
        columnCurrentIndex: columnIndex,
      };
      setSelectionVisible(false);
    }
  }
}

export function onMouseOver(
  rowIndex: number,
  columnIndex: number,
  selectionVisible: boolean,
  selection: DatePickerTableSelection,
  setSelection: Dispatch<SetStateAction<DatePickerTableSelection>>,
  tableCells: DatePickerTableCell[],
  firstSelection: React.MutableRefObject<DatePickerTableSelection>,
  minRange: number,
  maxRange: number,
  blockCells: string[],
  checkoutOnlyCells: string[],
) {
  //check if first clicked
  if (selectionVisible) {
    const tableCell = getTableCell(tableCells, rowIndex, columnIndex);
    const firstSelectionTableCell = getTableCell(
      tableCells,
      firstSelection.current.rowCurrentIndex,
      firstSelection.current.columnCurrentIndex,
    );

    //check if the mouse overed cell is valid
    if (
      tableCell &&
      !tableCell.virtual &&
      dayjs(tableCell.date).isAfter(
        dayjs(firstSelectionTableCell.date).subtract(1, 'day'),
      )
    ) {
      //check if the mouse overed cell is disabled
      if (tableCell.status === 'Block') return;
      const isCellDisabled = checkIsCellDisabledAfterFirstSelection(
        tableCell,
        firstSelection,
        null,
        minRange,
        maxRange,
        tableCells,
        blockCells,
        checkoutOnlyCells,
      );
      if (isCellDisabled) {
        return;
      }

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
        selectProp.endDate = '';
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
