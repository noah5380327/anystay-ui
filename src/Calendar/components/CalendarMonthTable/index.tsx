import { Button } from 'antd';
import {
  CalendarMonthTableProp,
  CalendarMonthTableSelection,
} from 'anystay-ui/Calendar/components/CalendarMonthTable/interface';
import { onOccupiedClick } from '../CalendarMonthTable/util';

import {
  generateTableCells,
  getColumBlockStyle,
  getColumnBackgroundSelectedStyle,
  getColumnDisabledStyle,
  getColumnVirtualStyle,
  getCurrentColumnBorderSelectedStyle,
  getOccupiedBorderStyling,
  getTableCell,
  getTableCellOccupied,
  getTableCellStartOccupiedCondition,
  getTableCellVirtualCondition,
  onMouseDown,
  onMouseOver,
  onMouseUp,
  onScrollDate,
  onSectionRenderJumpToToday,
  showReturnToToday,
} from 'anystay-ui/Calendar/components/CalendarMonthTable/util';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
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
    const firstSelection = useRef<CalendarMonthTableSelection>({
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
              onSectionRendered={() => {
                onSectionRenderJumpToToday(
                  init,
                  props.todayScrollTop,
                  props.monthDate,
                  props.setCustomScrollTop,
                  width,
                );
              }}
              onScroll={(params) => {
                onScrollDate(params, width / 7, tableCells, props);
                showReturnToToday(
                  width / 7,
                  props.customScrollTop,
                  props.todayScrollTop.current,
                  props.setShowReturnToToday,
                );
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
                    {getTableCellStartOccupiedCondition(
                      tableCells,
                      rowIndex,
                      columnIndex,
                    ) && (
                      <div
                        className={`calendar-month-table-row-column-content-occupied-wrapper`}
                        style={{
                          width: getTableCellOccupied(
                            tableCells,
                            rowIndex,
                            columnIndex,
                            width / 7,
                          ).width,
                          minWidth: getTableCellOccupied(
                            tableCells,
                            rowIndex,
                            columnIndex,
                            width / 7,
                          ).width,
                          left: getTableCellOccupied(
                            tableCells,
                            rowIndex,
                            columnIndex,
                            width / 7,
                          ).left,
                          background: getTableCell(
                            tableCells,
                            rowIndex,
                            columnIndex,
                          ).occupied?.color,
                          ...getOccupiedBorderStyling(
                            tableCells,
                            rowIndex,
                            columnIndex,
                            width / 7,
                          ),
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
                        <div
                          className="calendar-month-table-row-column-content-occupied-content-container"
                          style={{
                            transform: `translateX(${
                              getTableCellOccupied(
                                tableCells,
                                rowIndex,
                                columnIndex,
                                width / 7,
                              ).translateX
                            }px)`,
                          }}
                        >
                          {getTableCell(tableCells, rowIndex, columnIndex)
                            .occupied?.avatar && (
                            <div
                              className={`calendar-month-table-row-column-content-occupied-image-container`}
                            >
                              <img
                                src={
                                  getTableCell(
                                    tableCells,
                                    rowIndex,
                                    columnIndex,
                                  ).occupied?.avatar
                                }
                                alt={`avatar`}
                              />
                            </div>
                          )}
                          <div
                            className={`calendar-month-table-row-column-content-occupied-text-container`}
                          >
                            <span
                              className={`calendar-month-table-row-column-content-occupied-text-name`}
                            >
                              {
                                getTableCell(tableCells, rowIndex, columnIndex)
                                  .occupied?.name
                              }
                            </span>
                            <span
                              className={`calendar-month-table-row-column-content-occupied-text`}
                            >
                              {
                                getTableCell(tableCells, rowIndex, columnIndex)
                                  .occupied?.text
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
        {props.showReturnToToday && (
          <div className={`calendar-month-table-return-today-container`}>
            <Button
              type="primary"
              onClick={() => {
                props.setCustomScrollTop(props.todayScrollTop.current);
              }}
              className={`calendar-month-table-return-today-btn`}
            >
              Return to today
            </Button>
          </div>
        )}
      </div>
    );
  },
);

export default CalendarMonthTable;
