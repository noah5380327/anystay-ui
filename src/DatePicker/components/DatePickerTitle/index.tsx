// @ts-ignore
import { AntdDatePickerProp } from 'anystay-ui/DatePicker/components/DatePickerTitle/interface';
import React, { type FC } from 'react';
import AntdDatePicker from '../AntdDatePicker/index';
import './style.less';

const CalendarMonthTitle: FC<AntdDatePickerProp> = (props) => {
  return (
    <div>
      <div className={`calendar-month-title-container`}>
        <span className={`calendar-month-title-text`}>{props.monthTitle}</span>
        <div className={`calendar-month-title-date-container`}>
          <span className={`calendar-month-title-date-text`}>Sun</span>
          <span className={`calendar-month-title-date-text`}>Mon</span>
          <span className={`calendar-month-title-date-text`}>Tue</span>
          <span className={`calendar-month-title-date-text`}>Wed</span>
          <span className={`calendar-month-title-date-text`}>Thu</span>
          <span className={`calendar-month-title-date-text`}>Fri</span>
          <span className={`calendar-month-title-date-text`}>Sat</span>
        </div>
      </div>
      <AntdDatePicker
        selectedDate={props.monthlyTitleSelectedDate}
        setSelectedDate={props.setMonthlyTitleSelectedDate}
        calendarTitleProp={props}
        todayScrollTop={props.todayScrollTop}
        monthDate={props.monthDate}
        cellHeightMonthly={props.cellHeightMonthly}
      />
    </div>
  );
};

export default CalendarMonthTitle;
