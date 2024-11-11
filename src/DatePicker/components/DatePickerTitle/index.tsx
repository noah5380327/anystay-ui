// @ts-ignore
import { AntdDatePickerProp } from 'anystay-ui/DatePicker/components/DatePickerTitle/interface';
import React, { type FC } from 'react';
// import AntdDatePicker from '../AntdDatePicker/index';
import './style.less';

const CalendarMonthTitle: FC<AntdDatePickerProp> = (props) => {
  return (
    <div>
      <div className={`date-picker-title-container`}>
        <span className={`date-picker-title-text`}>{props.monthTitle}</span>
        <div className={`date-picker-title-date-container`}>
          <span className={`date-picker-title-date-text`}>Su</span>
          <span className={`date-picker-title-date-text`}>Mo</span>
          <span className={`date-picker-title-date-text`}>Tu</span>
          <span className={`date-picker-title-date-text`}>We</span>
          <span className={`date-picker-title-date-text`}>Th</span>
          <span className={`date-picker-title-date-text`}>Fr</span>
          <span className={`date-picker-title-date-text`}>Sa</span>
        </div>
      </div>
      {/* <AntdDatePicker
        selectedDate={props.monthlyTitleSelectedDate}
        setSelectedDate={props.setMonthlyTitleSelectedDate}
        calendarTitleProp={props}
        todayScrollTop={props.todayScrollTop}
        monthDate={props.monthDate}
        cellHeightMonthly={props.cellHeightMonthly}
      /> */}
    </div>
  );
};

export default CalendarMonthTitle;
