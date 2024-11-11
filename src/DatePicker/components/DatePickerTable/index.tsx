import {
  DatePickerTableProp,
  DatePickerTableSelection,
} from 'anystay-ui/DatePicker/components/DatePickerTable/interface';

import {
  generateTableCells,
  getBlockCheckoutOnlyMinimumNightCells,
  getColumnBackgroundSelectedStyle,
  getColumnStatusStyle,
  getColumnVirtualStyle,
  getCurrentColumnBorderSelectedStyle,
  getTableCell,
  getTableCellVirtualCondition,
  getToolTipPosition,
  onMouseDown,
  onMouseOver,
  onMouseUp,
  onScrollDate,
  onSectionRenderJumpToToday,
  onTouchStart,
  setSelectionByValue,
} from 'anystay-ui/DatePicker/components/DatePickerTable/utils';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AutoSizer, Grid } from 'react-virtualized';

import './style.less';

const DatePickerTable = forwardRef<HTMLInputElement, DatePickerTableProp>(
  (props, ref) => {
    const [selectionVisible, setSelectionVisible] = useState<boolean>(false);
    const [arrivalUnavailableCell, setArrivalUnavailableCell] = useState<{
      key: string;
      status: string;
    }>({ key: '', status: '' });
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

    const blockCells = props.blockCells || [];

    const {
      checkoutOnlyCells,
      unavailableDueToMinimumStayCells,
      updatedBlockCells,
    } = useMemo(() => {
      if (blockCells.length > 1) {
        return getBlockCheckoutOnlyMinimumNightCells(
          props.minRange,
          blockCells,
        );
      }
      return {
        checkoutOnlyCells: [],
        unavailableDueToMinimumStayCells: [],
        updatedBlockCells: [],
      };
    }, [props.blockCells, props.minRange]);
    const tableCells = useMemo(() => {
      if (Object.keys(props.monthDate).length !== 0) {
        return generateTableCells(
          props.monthDate,
          updatedBlockCells,
          checkoutOnlyCells,
          unavailableDueToMinimumStayCells,
        );
      } else {
        return [];
      }
    }, [
      props.monthDate,
      updatedBlockCells,
      checkoutOnlyCells,
      unavailableDueToMinimumStayCells,
    ]);

    const init = useRef(false);

    useEffect(() => {
      onMouseUp(selection, tableCells, props.onSelect);
    }, [selectionVisible]);

    useEffect(() => {
      if (props.value.length > 0 && tableCells.length > 0) {
        setSelectionByValue(
          tableCells,
          props.value,
          setSelection,
          firstSelection,
        );
        if (props.value.length === 1) {
          setSelectionVisible(true);
        }
      }
    }, [tableCells]);

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
        className={`date-picker-table-container`}
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
                className={`date-picker-date-value-container`}
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
                      className={`date-picker-table-row-column-container
                  ${getColumnBackgroundSelectedStyle(
                    rowIndex,
                    columnIndex,
                    selection,
                  )}
                  ${getCurrentColumnBorderSelectedStyle(tableCell)}
                  ${getColumnStatusStyle(
                    tableCells,
                    tableCell,
                    firstSelection,
                    props.minRange,
                    props.maxRange,
                    blockCells,
                    checkoutOnlyCells,
                  )}
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
                          tableCell,
                          firstSelection,
                          props.minRange,
                          props.maxRange,
                          blockCells,
                          checkoutOnlyCells,
                          setArrivalUnavailableCell,
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
                          tableCell,
                          firstSelection,
                          props.minRange,
                          props.maxRange,
                          blockCells,
                          checkoutOnlyCells,
                          setArrivalUnavailableCell,
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
                          tableCell,
                          firstSelection,
                          props.minRange,
                          props.maxRange,
                          blockCells,
                          checkoutOnlyCells,
                          setArrivalUnavailableCell,
                        );
                      }}
                    >
                      {arrivalUnavailableCell.key === key &&
                        arrivalUnavailableCell.status === 'CheckoutOnly' && (
                          <div
                            className={`date-picker-table-row-column-arrival-unavailable-tooltip ${getToolTipPosition(
                              tableCell,
                            )}`}
                          >
                            <p>Checkout only</p>
                          </div>
                        )}
                      {arrivalUnavailableCell.key === key &&
                        arrivalUnavailableCell.status ===
                          'UnavailableDueToMinimumStay' && (
                          <div
                            className={`date-picker-table-row-column-arrival-unavailable-tooltip ${getToolTipPosition(
                              tableCell,
                            )}`}
                          >
                            <p>{`${props.minRange} nights minimum`}</p>
                          </div>
                        )}

                      <div
                        className={`date-picker-table-row-column-content-container`}
                      >
                        <div
                          className={`date-picker-table-row-column-content-wrapper`}
                        >
                          {getTableCellVirtualCondition(
                            tableCells,
                            rowIndex,
                            columnIndex,
                          ) && (
                            <div
                              className={`date-picker-table-row-column-content-virtual-wrapper`}
                            >
                              <span
                                className={`date-picker-table-row-column-content-virtual-text`}
                              >
                                {tableCell?.value}
                              </span>
                            </div>
                          )}

                          <p
                            className={`date-picker-table-row-column-content-day`}
                          >
                            {tableCell?.day}
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
