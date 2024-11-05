import {
  DatePickerTableProp,
  DatePickerTableSelection,
} from 'anystay-ui/DatePicker/components/DatePickerTable/interface';

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
  onSectionRenderJumpToToday,
  onTouchStart,
} from 'anystay-ui/DatePicker/components/DatePickerTable/utils';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { AutoSizer, Grid } from 'react-virtualized';

import './style.less';

const DatePickerTable = forwardRef<HTMLInputElement, DatePickerTableProp>(
  (props, ref) => {
    const [selectionVisible, setSelectionVisible] = useState<boolean>(false);
    const [selection, setSelection] = useState<DatePickerTableSelection>({
      rowStartIndex: -1,
      rowEndIndex: -1,
      rowCurrentIndex: -1,
      columnStartIndex: -1,
      columnEndIndex: -1,
      columnCurrentIndex: -1,
    });
    const firstSelection = useRef<DatePickerTableSelection>({
      rowStartIndex: -1,
      rowEndIndex: -1,
      rowCurrentIndex: -1,
      columnStartIndex: -1,
      columnEndIndex: -1,
      columnCurrentIndex: -1,
    });

    const tableCells = generateTableCells(
      props.monthDate,

      props.blockRows || [],
    );

    const init = useRef(false);

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
          {({ width, height }) => {
            const cellHeight =
              props.cellHeightMonthly && props.cellHeightMonthly > width / 7
                ? props.cellHeightMonthly
                : width / 7;
            const cellWidth = width / 7;
            return (
              <Grid
                className={`calendar-month-date-value-container`}
                width={width}
                height={height}
                columnCount={7}
                columnWidth={cellWidth}
                rowCount={tableCells.length / 7}
                rowHeight={cellHeight}
                clientHeight={props.clientHeight}
                clientWidth={props.clientWidth}
                onSectionRendered={() => {
                  onSectionRenderJumpToToday(
                    init,
                    props.todayScrollTop,
                    props.monthDate,
                    props.setCustomScrollTop,
                    cellHeight,
                  );
                }}
                onScroll={(params) => {
                  onScrollDate(params, cellHeight, tableCells, props);
                  props.onScroll(params);
                }}
                scrollHeight={props.scrollHeight}
                scrollLeft={props.scrollLeft}
                scrollTop={props.scrollTop}
                scrollWidth={props.scrollWidth}
                cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                  const tableCell = getTableCell(
                    tableCells,
                    rowIndex,
                    columnIndex,
                  );
                  return (
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
                          selection,
                          tableCells,
                          firstSelection,
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
                          firstSelection,
                        )
                      }
                      onTouchStart={() => {
                        onTouchStart(
                          rowIndex,
                          columnIndex,
                          selectionVisible,
                          setSelectionVisible,
                          setSelection,
                          selection,
                          tableCells,
                          firstSelection,
                        );
                      }}
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
                                {tableCell?.value}
                              </span>
                            </div>
                          )}

                          <p
                            className={`calendar-month-table-row-column-content-day`}
                          >
                            {tableCell?.day}
                          </p>
                          <p
                            className={`calendar-month-table-row-column-content-price`}
                          >
                            {!tableCell?.virtual && `${tableCell?.value}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            );
          }}
        </AutoSizer>
      </div>
    );
  },
);

export default DatePickerTable;
