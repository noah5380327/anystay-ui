import {
  CalendarTableProp,
  CalendarTableSelection,
} from 'anystay-ui/Calendar/components/CalendarTable/interface';
import 'anystay-ui/Calendar/components/CalendarTable/style.less';
import {
  getColumnBackgroundSelectedStyle,
  getColumnBorderSelectedStyle,
  getColumnDisabledStyle,
  onMouseDown,
  onMouseOver,
} from 'anystay-ui/Calendar/components/CalendarTable/util';
import React, { useState, type FC } from 'react';

const CalendarTable: FC<CalendarTableProp> = (props) => {
  const rows: number[] = new Array(props.rowNumber).fill(0);
  const columns: number[] = new Array(props.dayNumber).fill(0);

  const [selectionVisible, setSelectionVisible] = useState<boolean>(false);
  const [selection, setSelection] = useState<CalendarTableSelection>({
    rowStartIndex: -1,
    rowEndIndex: -1,
    columnStartIndex: -1,
    columnEndIndex: -1,
  });

  return (
    <div className={`calendar-table-container`}>
      {rows.map((rowItem, rowIndex) => (
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
               ${getColumnBorderSelectedStyle(rowIndex, columnIndex, selection)}
               ${getColumnDisabledStyle(columnIndex, props.subtractDayNumber)}`}
              style={{ width: props.elementWidth, height: props.elementWidth }}
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
                145
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarTable;
