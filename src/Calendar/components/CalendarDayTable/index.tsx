import { Button } from 'antd';
import {
  CalendarDayTableProp,
  CalendarDayTableSelection,
} from 'anystay-ui/Calendar/components/CalendarDayTable/interface';
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
  onOccupiedClick,
  returnToToday,
} from 'anystay-ui/Calendar/components/CalendarDayTable/util';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import './style.less';

const CalendarDayTable = forwardRef<HTMLInputElement, CalendarDayTableProp>(
  (props, ref) => {
    const [selectionVisible, setSelectionVisible] = useState<boolean>(false);
    const [selection, setSelection] = useState<CalendarDayTableSelection>({
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
      props.blockRows || [],
      props.occupiedRows || [],
    );

    useEffect(() => {
      if (!selectionVisible) {
        onMouseUp(selection, tableCells, props.onSelect);
      }
    }, [selectionVisible]);

    // @ts-ignore
    useImperativeHandle(ref, () => ({
      forceClearSelect: () => {
        setSelection({
          rowStartIndex: -1,
          rowEndIndex: -1,
          rowCurrentIndex: -1,
          columnStartIndex: -1,
          columnEndIndex: -1,
          columnCurrentIndex: -1,
        });
      },
    }));

    return (
      <div ref={ref} className={`calendar-day-table-container`}>
        <AutoSizer disableHeight>
          {({ width }) => (
            <Grid
              className={`calendar-day-date-value-container`}
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
                  className={`calendar-day-table-row-column-container
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
                  ${getColumnDisabledStyle(
                    columnIndex,
                    props.subtractDayNumber,
                  )}
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
                  <div
                    className={`calendar-day-table-row-column-content-container`}
                  >
                    <div
                      className={`calendar-day-table-row-column-content-wrapper`}
                    >
                      {getTableCell(tableCells, rowIndex, columnIndex)?.value}
                    </div>
                  </div>
                  {getTableCellOccupiedCondition(
                    tableCells,
                    rowIndex,
                    columnIndex,
                  ) && (
                    <div
                      className={`calendar-day-table-row-column-content-occupied-wrapper`}
                      style={{
                        width: getTableCellOccupied(
                          tableCells,
                          rowIndex,
                          columnIndex,
                          props,
                        ).width,
                        minWidth: getTableCellOccupied(
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
                        background: getTableCell(
                          tableCells,
                          rowIndex,
                          columnIndex,
                        ).occupied?.color,
                      }}
                      onClick={() =>
                        onOccupiedClick(
                          tableCells,
                          rowIndex,
                          columnIndex,
                          props,
                        )
                      }
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                      onMouseOver={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {getTableCell(tableCells, rowIndex, columnIndex).occupied
                        ?.avatar && (
                        <div
                          className={`calendar-day-table-row-column-content-occupied-image-container`}
                        >
                          <img
                            src={
                              getTableCell(tableCells, rowIndex, columnIndex)
                                .occupied?.avatar
                            }
                            alt={`avatar`}
                          />
                        </div>
                      )}
                      <div
                        className={`calendar-day-table-row-column-content-occupied-text-container`}
                      >
                        <span
                          className={`calendar-day-table-row-column-content-occupied-text-name`}
                        >
                          {
                            getTableCell(tableCells, rowIndex, columnIndex)
                              .occupied?.name
                          }
                        </span>
                        <span
                          className={`calendar-day-table-row-column-content-occupied-text`}
                        >
                          {
                            getTableCell(tableCells, rowIndex, columnIndex)
                              .occupied?.text
                          }
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
          <div className={`calendar-day-table-return-today-container`}>
            <Button
              type="primary"
              onClick={() => returnToToday(props)}
              className={`calendar-day-table-return-today-btn`}
            >
              Return to today
            </Button>
          </div>
        )}
      </div>
    );
  },
);

export default CalendarDayTable;
