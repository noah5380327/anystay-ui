import { DatePicker } from 'antd';
// @ts-ignore
import CalendarLeftPng from 'anystay-ui/Calendar/assets/left.png';
import { CalendarTitleProp } from 'anystay-ui/Calendar/components/CalendarTitle/interface';
import {
  generateTitleCells,
  getBorderStyle,
  getDateName,
  getTitleDate,
  reSetScrollLeft,
} from 'anystay-ui/Calendar/components/CalendarTitle/util';
import dayjs from 'dayjs';
import React, { useEffect, useState, type FC } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import './style.less';

const CalendarTitle: FC<CalendarTitleProp> = (props) => {
  const titleCells = generateTitleCells(props);
  const titleDate = getTitleDate(titleCells);

  const [selectedDate, setSelectedDay] = useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    if (!props.showReturnToToday) {
      setSelectedDay(dayjs());
    }
  }, [props.showReturnToToday]);

  return (
    <div className={`calendar-title-container`}>
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
            onScroll={props.onScroll}
            scrollHeight={props.scrollHeight}
            scrollLeft={props.scrollLeft}
            scrollTop={props.scrollTop}
            scrollWidth={props.scrollWidth}
            style={{ overflow: 'hidden' }}
            cellRenderer={({ columnIndex, key, style }) => (
              <span
                key={key}
                className={`calendar-title-text
                ${getBorderStyle(props, titleCells[columnIndex])}`}
                style={style}
              >
                &nbsp;{getDateName(titleCells[columnIndex])}
              </span>
            )}
          />
        )}
      </AutoSizer>

      <div className={`calendar-title-action-container`}>
        <DatePicker
          inputReadOnly
          minDate={dayjs(titleDate.firstDate)}
          maxDate={dayjs(titleDate.lastDate)}
          value={selectedDate}
          format={`${titleDate.firstDate} - ${titleDate.lastDate}`}
          allowClear={false}
          showNow={false}
          suffixIcon={
            <img
              alt={`left`}
              src={CalendarLeftPng}
              className={`calendar-title-action-operation-image`}
            />
          }
          onChange={(date) => {
            setSelectedDay(date);
            reSetScrollLeft(date.format('YYYY-MM-DD'), props, titleDate);
          }}
        />
      </div>
    </div>
  );
};

export default CalendarTitle;
