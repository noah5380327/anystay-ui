import { DatePicker } from 'antd';
// @ts-ignore
import CalendarLeftPng from 'anystay-ui/Calendar/assets/left.png';
import { CalendarDayTitleProp } from 'anystay-ui/Calendar/components/CalendarDayTitle/interface';
import {
  generateTitleCells,
  getBorderStyle,
  getDateName,
  getScrollDate,
  getTitleDate,
  reSetScrollLeft,
} from 'anystay-ui/Calendar/components/CalendarDayTitle/util';
import dayjs from 'dayjs';
import React, { useState, type FC } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
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

      <div className={`calendar-day-title-action-container`}>
        <DatePicker
          inputReadOnly
          picker="month"
          value={selectedDate}
          allowClear={false}
          showNow={false}
          suffixIcon={
            <img
              alt={`left`}
              src={CalendarLeftPng}
              className={`calendar-day-title-action-operation-image`}
            />
          }
          onChange={(date) => {
            setSelectedDate(date);
            reSetScrollLeft(date.format('YYYY-MM-DD'), props, titleDate);
          }}
        />
      </div>
    </div>
  );
};

export default CalendarDayTitle;
