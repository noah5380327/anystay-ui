import { Button } from 'antd';
import {
  CalendarTableProp,
  CalendarTableSelection,
} from 'anystay-ui/Calendar/components/CalendarTable/interface';
import {
  generateTableCells,
  getColumBlockStyle,
  getColumnBackgroundSelectedStyle,
  getColumnBorderSelectedStyle,
  getColumnDisabledStyle,
  getCurrentColumnBorderSelectedStyle,
  getTableCell,
  getTableCellOccupied,
  getTableCellOccupiedCondition,
  onMouseDown,
  onMouseOver,
  onMouseUp,
  returnToToday,
} from 'anystay-ui/Calendar/components/CalendarTable/util';
import React, { useEffect, useState, type FC } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import './style.less';

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

  useEffect(() => {
    if (props.forceClearSelect) {
      setSelection({
        rowStartIndex: -1,
        rowEndIndex: -1,
        rowCurrentIndex: -1,
        columnStartIndex: -1,
        columnEndIndex: -1,
        columnCurrentIndex: -1,
      });
      props.setForceClearSelect(false);
    }
  }, [props.forceClearSelect]);

  return (
    <div className={`calendar-table-container`}>
      <AutoSizer disableHeight>
        {({ width }) => (
          <Grid
            className={`calendar-date-value-container`}
            width={width}
            height={props.columnWidth * props.rows.length}
            columnCount={props.totalDayNumber}
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
                ${getColumnBorderSelectedStyle(
                  rowIndex,
                  columnIndex,
                  selection,
                )}
                ${getColumnDisabledStyle(columnIndex, props.subtractDayNumber)}
                ${getColumBlockStyle(tableCells, rowIndex, columnIndex)}`}
                style={style}
                onMouseDown={() =>
                  onMouseDown(
                    rowIndex,
                    columnIndex,
                    selectionVisible,
                    setSelectionVisible,
                    setSelection,
                    props.subtractDayNumber,
                    tableCells,
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
                {getTableCellOccupiedCondition(
                  tableCells,
                  rowIndex,
                  columnIndex,
                ) && (
                  <div
                    className={`calendar-table-row-column-content-occupied-wrapper`}
                    style={{
                      width: getTableCellOccupied(
                        tableCells,
                        rowIndex,
                        columnIndex,
                        props,
                      ).width,
                      left: getTableCellOccupied(
                        tableCells,
                        rowIndex,
                        columnIndex,
                        props,
                      ).left,
                    }}
                  >
                    <div
                      className={`calendar-table-row-column-content-occupied-image-container`}
                    >
                      <img
                        src={
                          getTableCell(tableCells, rowIndex, columnIndex).avatar
                        }
                        alt={`avatar`}
                      />
                    </div>
                    <div
                      className={`calendar-table-row-column-content-occupied-text-container`}
                    >
                      <span
                        className={`calendar-table-row-column-content-occupied-text-name`}
                      >
                        {getTableCell(tableCells, rowIndex, columnIndex).name}
                      </span>
                      <span
                        className={`calendar-table-row-column-content-occupied-text`}
                      >
                        {getTableCell(tableCells, rowIndex, columnIndex).text}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          />
        )}
      </AutoSizer>

      {props.showReturnToToday && (
        <div className={`calendar-table-return-today-container`}>
          <Button
            type="primary"
            onClick={() => returnToToday(props)}
            className={`calendar-table-return-today-btn`}
          >
            Return to today
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalendarTable;
