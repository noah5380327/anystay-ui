import { CalendarDayTitleProp } from 'anystay-ui/Calendar/components/CalendarDayTitle/interface';
import {
  generateTitleCells,
  getBorderStyle,
  getDateName,
  getScrollDate,
  getTitleDate,
} from 'anystay-ui/Calendar/components/CalendarDayTitle/util';
import dayjs from 'dayjs';
import React, { useState, type FC } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import CalendarDatePicker from '../CalendarDatePicker';
import './style.less';

const CalendarDayTitle: FC<CalendarDayTitleProp> = (props) => {
  const titleCells = generateTitleCells(props);
  const titleDate = getTitleDate(titleCells);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  return (
    <div className={`calendar-day-title-container`}>
      <AutoSizer disableHeight>
        {({ width }) => (
          <Grid
            width={width}
            height={props.titleRowHeight}
            columnCount={titleCells.length}
            columnWidth={({ index }) => {
              return props.columnWidth * titleCells[index].dates.length;
            }}
            rowCount={1}
            rowHeight={props.titleRowHeight}
            clientHeight={props.clientHeight}
            clientWidth={props.clientWidth}
            onScroll={(params) => {
              const date = getScrollDate(params, props, titleDate);
              setSelectedDate(date);
              props.onScroll(params);
            }}
            scrollHeight={props.scrollHeight}
            scrollLeft={props.scrollLeft}
            scrollTop={props.scrollTop}
            scrollWidth={props.scrollWidth}
            style={{ overflow: 'hidden' }}
            cellRenderer={({ columnIndex, key, style }) => (
              <span
                key={key}
                className={`calendar-day-title-text
                ${getBorderStyle(props, titleCells[columnIndex])}`}
                style={style}
              >
                &nbsp;{getDateName(titleCells[columnIndex])}
              </span>
            )}
          />
        )}
      </AutoSizer>
      <CalendarDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        titleDate={titleDate}
        calendarTitleProp={props}
        type={props.type}
        monthDate={props.monthDate}
      />
    </div>
  );
};

export default CalendarDayTitle;
