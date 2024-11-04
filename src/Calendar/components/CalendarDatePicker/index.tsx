import { DatePicker } from 'antd';
// @ts-ignore
import CalendarLeftPng from 'anystay-ui/Calendar/assets/left.png';
import { CalendarDayTitleDate } from 'anystay-ui/Calendar/components/CalendarDatePicker/interface';
import {
  reSetScrollLeft,
  reSetScrollTop,
} from 'anystay-ui/Calendar/components/CalendarDatePicker/utils';
import { CalendarDayTitleProp } from 'anystay-ui/Calendar/components/CalendarDayTitle/interface';
import { CalendarMonthTitleProp } from 'anystay-ui/Calendar/components/CalendarMonthTitle/interface';
import { CalendarMonthDate } from 'anystay-ui/Calendar/interface';

import dayjs from 'dayjs';
import React, { useMemo, type FC } from 'react';
import './style.less';

interface CalendarDatePickerProps {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  titleDate?: CalendarDayTitleDate;
  calendarTitleProp: CalendarDayTitleProp | CalendarMonthTitleProp;
  todayScrollTop?: React.MutableRefObject<number>;
  type: string;
  monthDate: CalendarMonthDate;
  cellHeightMonthly?: number;
}

const CalendarDatePicker: FC<CalendarDatePickerProps> = (props) => {
  const minDate = useMemo(() => {
    const monthDateKeys = Object.keys(props.monthDate);
    return dayjs(monthDateKeys[0]);
  }, [props.monthDate]);
  const maxDate = useMemo(() => {
    const monthDateKeys = Object.keys(props.monthDate);
    return dayjs(monthDateKeys[monthDateKeys.length - 1]);
  }, [props.monthDate]);

  return (
    <div className={`calendar-date-picker-title-action-container`}>
      <DatePicker
        className={'calendar-date-picker'}
        inputReadOnly
        picker="month"
        value={props.selectedDate}
        allowClear={false}
        showNow={false}
        minDate={minDate}
        maxDate={maxDate}
        suffixIcon={
          <img
            alt={`left`}
            src={CalendarLeftPng}
            className={`calendar-date-picker-title-action-operation-image`}
          />
        }
        onChange={(date) => {
          props.setSelectedDate(date);
          if (props.type === 'Day') {
            reSetScrollLeft(
              date.format('YYYY-MM-DD'),
              props.calendarTitleProp as CalendarDayTitleProp,
              props.titleDate!,
            );
          } else if (props.type === 'Month') {
            reSetScrollTop(
              props.calendarTitleProp as CalendarMonthTitleProp,
              date,
              props.monthDate as CalendarMonthDate,
              props.cellHeightMonthly as number,
            );
          }
        }}
      />
    </div>
  );
};
export default CalendarDatePicker;
