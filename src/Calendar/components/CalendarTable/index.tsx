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
  onMouseDown,
  onMouseOver,
  onMouseUp,
} from 'anystay-ui/Calendar/components/CalendarTable/util';
import React, { useEffect, useState, type FC } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';

const CalendarTable: FC<CalendarTableProp> = (props) => {
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
    props.monthDate,
    props.rows,
    props.fillRows || [],
  );

  useEffect(() => {
    if (!selectionVisible) {
      onMouseUp(selection, tableCells, props.onSelect);
    }
  }, [selectionVisible]);

  return (
    <div className={`calendar-table-container`}>
      <AutoSizer disableHeight>
        {({ width }) => (
          <Grid
            className={`calendar-date-value-container`}
            width={width}
            height={props.columnWidth * props.rows.length}
            columnCount={props.dayNumber}
            columnWidth={props.columnWidth}
            rowCount={props.rows.length}
            rowHeight={props.columnWidth}
            clientHeight={props.clientHeight}
            clientWidth={props.clientWidth}
            onScroll={props.onScroll}
            scrollHeight={props.scrollHeight}
            scrollLeft={props.scrollLeft}
            scrollTop={props.scrollTop}
            scrollWidth={props.scrollWidth}
            cellRenderer={({ columnIndex, key, rowIndex, style }) => (
              <div
                key={key}
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
                style={style}
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
            )}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default CalendarTable;
