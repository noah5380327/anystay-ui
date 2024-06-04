// @ts-ignore
import CalendarLeftPng from 'anystay-ui/Calendar/assets/left.png';
import { CalendarDateProp } from 'anystay-ui/Calendar/components/CalendarDate/interface';
import 'anystay-ui/Calendar/components/CalendarDate/style.less';
import {
  generateDateCells,
  getBorderStyle,
  getCurrentStyle,
  getDateNumber,
  getDateWeekDay,
} from 'anystay-ui/Calendar/components/CalendarDate/util';
import React, { type FC } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';

const CalendarDate: FC<CalendarDateProp> = (props) => {
  const dateRowHeight = 65;
  const dateCells = generateDateCells(props);

  return (
    <div className={`calendar-date-container`}>
      <div className={`calendar-date-operation-container`}>
        <img alt={`left`} src={CalendarLeftPng} />
      </div>
      <AutoSizer disableHeight>
        {({ width }) => (
          <Grid
            width={width}
            height={dateRowHeight}
            columnCount={dateCells.length}
            columnWidth={props.columnWidth}
            rowCount={1}
            rowHeight={dateRowHeight}
            clientHeight={props.clientHeight}
            clientWidth={props.clientWidth}
            onScroll={props.onScroll}
            scrollHeight={props.scrollHeight}
            scrollLeft={props.scrollLeft}
            scrollTop={props.scrollTop}
            scrollWidth={props.scrollWidth}
            cellRenderer={({ columnIndex, key, style }) => (
              <div
                key={key}
                className={`calendar-date-value-item-container
                ${getBorderStyle(props, dateCells[columnIndex])}`}
                style={style}
              >
                <div
                  className={`calendar-date-value-item-wrapper
                  ${getCurrentStyle(dateCells[columnIndex])}`}
                >
                  <span className={`calendar-date-value-item-number`}>
                    {getDateNumber(dateCells[columnIndex])}
                  </span>
                  <span className={`calendar-date-value-item-week`}>
                    {getDateWeekDay(dateCells[columnIndex])}
                  </span>
                </div>
              </div>
            )}
          />
        )}
      </AutoSizer>
      <div
        className={`calendar-date-operation-container calendar-date-operation-right-container`}
      >
        <img alt={`right`} src={CalendarLeftPng} />
      </div>
    </div>
  );
};

export default CalendarDate;
