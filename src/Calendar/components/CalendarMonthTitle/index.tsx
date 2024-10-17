// @ts-ignore
import { CalendarMonthTitleProp } from 'anystay-ui/Calendar/components/CalendarMonthTitle/interface';
import React, { type FC } from 'react';
import CalendarDatePicker from '../CalendarDatePicker';
import './style.less';

const CalendarMonthTitle: FC<CalendarMonthTitleProp> = (props) => {
  return (
    <div>
      <div className={`calendar-month-title-container`}>
        <span className={`calendar-month-title-text`}>
          &nbsp;{props.monthTitle}
        </span>
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
      <CalendarDatePicker
        selectedDate={props.monthlyTitleSelectedDate}
        setSelectedDate={props.setMonthlyTitleSelectedDate}
        type={props.type}
        calendarTitleProp={props}
        todayScrollTop={props.todayScrollTop}
        monthDate={props.monthDate}
        scrollWidth={props.scrollWidth}
      />
    </div>
  );
};

export default CalendarMonthTitle;
