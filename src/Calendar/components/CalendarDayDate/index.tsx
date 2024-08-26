// @ts-ignore
import CalendarLeftPng from 'anystay-ui/Calendar/assets/left.png';
import { CalendarDayDateProp } from 'anystay-ui/Calendar/components/CalendarDayDate/interface';
import {
  generateDateCells,
  getBorderStyle,
  getCurrentStyle,
  getDateNumber,
  getDateWeekDay,
  onScrollNext,
  onScrollPrev,
} from 'anystay-ui/Calendar/components/CalendarDayDate/util';
import React, { type FC } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import './style.less';

const CalendarDayDate: FC<CalendarDayDateProp> = (props) => {
  const dateCells = generateDateCells(props);

  return (
    <div className={`calendar-day-date-container`}>
      <div
        className={`calendar-day-date-operation-container`}
        onClick={() => onScrollPrev(props)}
      >
        <img alt={`left`} src={CalendarLeftPng} />
      </div>
      <AutoSizer disableHeight>
        {({ width }) => (
          <Grid
            width={width}
            height={props.dateRowHeight}
            columnCount={dateCells.length}
            columnWidth={props.columnWidth}
            rowCount={1}
            rowHeight={props.dateRowHeight}
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
                className={`calendar-day-date-value-item-container
                ${getBorderStyle(props, dateCells[columnIndex])}`}
                style={style}
              >
                <div
                  className={`calendar-day-date-value-item-wrapper
                  ${getCurrentStyle(dateCells[columnIndex])}`}
                >
                  <span className={`calendar-day-date-value-item-number`}>
                    {getDateNumber(dateCells[columnIndex])}
                  </span>
                  <span className={`calendar-day-date-value-item-week`}>
                    {getDateWeekDay(dateCells[columnIndex])}
                  </span>
                </div>
              </div>
            )}
          />
        )}
      </AutoSizer>
      <div
        className={`calendar-day-date-operation-container calendar-day-date-operation-right-container`}
        onClick={() => onScrollNext(props)}
      >
        <img alt={`right`} src={CalendarLeftPng} />
      </div>
    </div>
  );
};

export default CalendarDayDate;
