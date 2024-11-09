import { DatePicker } from 'antd';
// @ts-ignore
import CalendarLeftPng from 'anystay-ui/Calendar/assets/left.png';
import { DatePickerDayTitleDate } from 'anystay-ui/DatePicker/components/AntdDatePicker/interface';
import { reSetScrollTop } from 'anystay-ui/DatePicker/components/AntdDatePicker/utils';
import { DatePickerTitleProp } from 'anystay-ui/DatePicker/components/DatePickerTitle/interface';
import { DatePickerMonthDate } from 'anystay-ui/DatePicker/interface';

import dayjs from 'dayjs';
import React, { useMemo, type FC } from 'react';
import './style.less';

interface AntdDatePickerProps {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  titleDate?: DatePickerDayTitleDate;
  calendarTitleProp: DatePickerTitleProp;
  todayScrollTop?: React.MutableRefObject<number>;
  monthDate: DatePickerMonthDate;
  cellHeightMonthly?: number;
}

const AntdDatePicker: FC<AntdDatePickerProps> = (props) => {
  const minDate = useMemo(() => {
    const monthDateKeys = Object.keys(props.monthDate);
    return dayjs(monthDateKeys[0]);
  }, [props.monthDate]);
  const maxDate = useMemo(() => {
    const monthDateKeys = Object.keys(props.monthDate);
    return dayjs(monthDateKeys[monthDateKeys.length - 1]);
  }, [props.monthDate]);

  return (
    <div className={`date-picker-antd-title-action-container`}>
      <DatePicker
        className={'date-picker-antd'}
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
            className={`date-picker-antd-title-action-operation-image`}
          />
        }
        onChange={(date) => {
          props.setSelectedDate(date);
          reSetScrollTop(
            props.calendarTitleProp as DatePickerTitleProp,
            date,
            props.monthDate as DatePickerMonthDate,
            props.cellHeightMonthly as number,
          );
        }}
      />
    </div>
  );
};
export default AntdDatePicker;
