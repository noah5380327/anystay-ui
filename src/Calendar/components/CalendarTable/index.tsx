import {
  CalendarTableProp,
  CalendarTableSelection,
} from 'anystay-ui/Calendar/components/CalendarTable/interface';
import 'anystay-ui/Calendar/components/CalendarTable/style.less';
import React, { Dispatch, SetStateAction, useState, type FC } from 'react';

function onMouseDown(
  rowIndex: number,
  columnIndex: number,
  setSelectionVisible: Dispatch<SetStateAction<boolean>>,
  setSelection: Dispatch<SetStateAction<CalendarTableSelection>>,
) {
  setSelectionVisible(true);
  setSelection({
    rowStartIndex: rowIndex,
    rowEndIndex: -1,
    columnStartIndex: columnIndex,
    columnEndIndex: -1,
  });
  const hideSelection = () => {
    setSelectionVisible(false);
    document.removeEventListener('mouseup', hideSelection);
  };
  document.addEventListener('mouseup', hideSelection);
}

function onMouseOver(
  rowIndex: number,
  columnIndex: number,
  selectionVisible: boolean,
  selection: CalendarTableSelection,
  setSelection: Dispatch<SetStateAction<CalendarTableSelection>>,
) {
  if (selectionVisible) {
    setSelection({
      rowStartIndex: selection.rowStartIndex,
      rowEndIndex: rowIndex,
      columnStartIndex: selection.columnStartIndex,
      columnEndIndex: columnIndex,
    });
  }
}

const CalendarTable: FC<CalendarTableProp> = (props) => {
  const rows: number[] = new Array(props.rowNumber).fill(0);
  const columns: number[] = new Array(14).fill(0);

  const [selectionVisible, setSelectionVisible] = useState<boolean>(false);
  const [selection, setSelection] = useState<CalendarTableSelection>({
    rowStartIndex: -1,
    rowEndIndex: -1,
    columnStartIndex: -1,
    columnEndIndex: -1,
  });

  function getColumnSelectedStyle(
    rowIndex: number,
    columnIndex: number,
    selection: CalendarTableSelection,
  ): string {
    const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } =
      selection;

    if (
      rowEndIndex !== -1 &&
      columnEndIndex !== -1 &&
      columnIndex >= columnStartIndex &&
      columnIndex <= columnEndIndex &&
      rowIndex >= rowStartIndex &&
      rowIndex <= rowEndIndex
    ) {
      return 'calendar-table-row-column-selected-container';
    }

    return '';
  }

  return (
    <div className={`calendar-table-container`}>
      {rows.map((rowItem, rowIndex) => (
        <div key={rowIndex} className={`calendar-table-row-container`}>
          {columns.map((columnItem, columnIndex) => (
            <div
              key={columnIndex}
              className={`calendar-table-row-column-container
               ${getColumnSelectedStyle(rowIndex, columnIndex, selection)}`}
              style={{ width: props.elementWidth, height: props.elementWidth }}
              onMouseDown={() =>
                onMouseDown(
                  rowIndex,
                  columnIndex,
                  setSelectionVisible,
                  setSelection,
                )
              }
              onMouseOver={() =>
                onMouseOver(
                  rowIndex,
                  columnIndex,
                  selectionVisible,
                  selection,
                  setSelection,
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
