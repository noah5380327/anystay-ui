import {
  CalendarMonthTableProp,
  CalendarMonthTableSelection,
} from 'anystay-ui/Calendar/components/CalendarMonthTable/interface';
import {
  generateTableCells,
  getColumBlockStyle,
  getColumnBackgroundSelectedStyle,
  getColumnDisabledStyle,
  getColumnVirtualStyle,
  getCurrentColumnBorderSelectedStyle,
  getTableCell,
  getTableCellVirtualCondition,
  onMouseDown,
  onMouseOver,
  onMouseUp,
  onScrollDate,
} from 'anystay-ui/Calendar/components/CalendarMonthTable/util';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import './style.less';

const CalendarMonthTable = forwardRef<HTMLInputElement, CalendarMonthTableProp>(
  (props, ref) => {
    const [selectionVisible, setSelectionVisible] = useState<boolean>(false);
    const [selection, setSelection] = useState<CalendarMonthTableSelection>({
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
      <div
        ref={ref}
        className={`calendar-month-table-container`}
        style={{ height: props.tableHeight }}
      >
        <AutoSizer>
          {({ width, height }) => (
            <Grid
              className={`calendar-month-date-value-container`}
              width={width}
              height={height}
              columnCount={7}
              columnWidth={width / 7}
              rowCount={tableCells.length / 7}
              rowHeight={width / 7}
              clientHeight={props.clientHeight}
              clientWidth={props.clientWidth}
              onScroll={(params) => {
                onScrollDate(params, width / 7, tableCells, props);
                props.onScroll(params);
              }}
              scrollHeight={props.scrollHeight}
              scrollLeft={props.scrollLeft}
              scrollTop={props.scrollTop}
              scrollWidth={props.scrollWidth}
              cellRenderer={({ columnIndex, key, rowIndex, style }) => (
                <div
                  key={key}
                  className={`calendar-month-table-row-column-container
                  ${getColumnBackgroundSelectedStyle(
                    rowIndex,
                    columnIndex,
                    selection,
                  )}
                  ${getCurrentColumnBorderSelectedStyle(
                    tableCells,
                    rowIndex,
                    columnIndex,
                  )}
                  ${getColumnDisabledStyle(tableCells, rowIndex, columnIndex)}
                  ${getColumBlockStyle(tableCells, rowIndex, columnIndex)}
                  ${getColumnVirtualStyle(tableCells, rowIndex, columnIndex)}`}
                  style={style}
                  onMouseDown={() =>
                    onMouseDown(
                      rowIndex,
                      columnIndex,
                      selectionVisible,
                      setSelectionVisible,
                      setSelection,
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
                      tableCells,
                    )
                  }
                >
                  <div
                    className={`calendar-month-table-row-column-content-container`}
                  >
                    <div
                      className={`calendar-month-table-row-column-content-wrapper`}
                    >
                      {getTableCellVirtualCondition(
                        tableCells,
                        rowIndex,
                        columnIndex,
                      ) && (
                        <div
                          className={`calendar-month-table-row-column-content-virtual-wrapper`}
                        >
                          <span
                            className={`calendar-month-table-row-column-content-virtual-text`}
                          >
                            {
                              getTableCell(tableCells, rowIndex, columnIndex)
                                ?.value
                            }
                          </span>
                        </div>
                      )}
                      {getTableCell(tableCells, rowIndex, columnIndex)?.day}
                    </div>
                  </div>
                </div>
              )}
            />
          )}
        </AutoSizer>
      </div>
    );
  },
);

export default CalendarMonthTable;
