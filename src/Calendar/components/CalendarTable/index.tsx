import {
  CalendarTableProp,
  CalendarTableSelection,
} from 'anystay-ui/Calendar/components/CalendarTable/interface';
import 'anystay-ui/Calendar/components/CalendarTable/style.less';
import {
  generateTableCells,
  getColumBlockStyle,
  getColumnBackgroundSelectedStyle,
  getColumnBorderSelectedStyle,
  getColumnDisabledStyle,
  getCurrentColumnBorderSelectedStyle,
  getTableCell,
  onClick,
  onMouseDown,
  onMouseOver,
} from 'anystay-ui/Calendar/components/CalendarTable/util';
import React, { useState, type FC } from 'react';

const CalendarTable: FC<CalendarTableProp> = (props) => {
  const columns: number[] = new Array(props.dayNumber).fill(0);

  const [selectionVisible, setSelectionVisible] = useState<boolean>(false);
  const [selection, setSelection] = useState<CalendarTableSelection>({
    rowStartIndex: -1,
    rowEndIndex: -1,
    rowCurrentIndex: -1,
    columnStartIndex: -1,
    columnEndIndex: -1,
    columnCurrentIndex: -1,
  });

  const tableCells = generateTableCells(
    props.allMonthDates,
    props.rows,
    props.fillRows || [],
  );

  return (
    <div className={`calendar-table-container`}>
      {props.rows.map((rowItem, rowIndex) => (
        <div key={rowIndex} className={`calendar-table-row-container`}>
          {columns.map((columnItem, columnIndex) => (
            <div
              key={columnIndex}
              className={`calendar-table-row-column-container
               ${getColumnBackgroundSelectedStyle(
                 rowIndex,
                 columnIndex,
                 selection,
               )}
               ${getCurrentColumnBorderSelectedStyle(
                 rowIndex,
                 columnIndex,
                 selection,
               )}
               ${getColumnBorderSelectedStyle(rowIndex, columnIndex, selection)}
               ${getColumnDisabledStyle(columnIndex, props.subtractDayNumber)}
               ${getColumBlockStyle(tableCells, rowIndex, columnIndex)}`}
              style={{
                minWidth: props.columnWidth,
                maxWidth: props.columnWidth,
                minHeight: props.columnWidth,
                maxHeight: props.columnWidth,
              }}
              onClick={() =>
                onClick(
                  rowIndex,
                  columnIndex,
                  selection,
                  setSelection,
                  props.subtractDayNumber,
                )
              }
              onMouseDown={() =>
                onMouseDown(
                  rowIndex,
                  columnIndex,
                  setSelectionVisible,
                  setSelection,
                  props.subtractDayNumber,
                )
              }
              onMouseOver={() =>
                onMouseOver(
                  rowIndex,
                  columnIndex,
                  selectionVisible,
                  selection,
                  setSelection,
                  props.subtractDayNumber,
                )
              }
            >
              <div className={`calendar-table-row-column-content-container`}>
                <div className={`calendar-table-row-column-content-wrapper`}>
                  {getTableCell(tableCells, rowIndex, columnIndex)?.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarTable;
