// @ts-ignore
import CalendarLeftPng from 'anystay-ui/Calendar/assets/left.png';
import { CalendarDateProp } from 'anystay-ui/Calendar/components/CalendarDate/interface';
import 'anystay-ui/Calendar/components/CalendarDate/style.less';
import {
  getDateNumber,
  getDateWeekDay,
  getFirstCurrentDateStyle,
  getFirstMonthDatesBorderStyle,
  getSecondCurrentDateStyle,
} from 'anystay-ui/Calendar/components/CalendarDate/util';
import React, { type FC } from 'react';

const CalendarDate: FC<CalendarDateProp> = (props) => {
  return (
    <div className={`calendar-date-container`}>
      <div className={`calendar-date-operation-container`}>
        <img alt={`left`} src={CalendarLeftPng} />
      </div>
      <div className={`calendar-date-value-container`}>
        {props.firstMonthDates.map((item, index) => (
          <div
            key={index}
            className={`calendar-date-value-item-container
            ${getFirstMonthDatesBorderStyle(props, index)}`}
            style={{ minWidth: props.columnWidth, maxWidth: props.columnWidth }}
          >
            <div
              className={`calendar-date-value-item-wrapper
               ${getFirstCurrentDateStyle(props, index)}`}
            >
              <span className={`calendar-date-value-item-number`}>
                {getDateNumber(item)}
              </span>
              <span className={`calendar-date-value-item-week`}>
                {getDateWeekDay(item)}
              </span>
            </div>
          </div>
        ))}
        {props.secondMonthDates.map((item, index) => (
          <div key={index} className={`calendar-date-value-item-container`}>
            <div
              className={`calendar-date-value-item-wrapper
                ${getSecondCurrentDateStyle(props, index)}`}
            >
              <span className={`calendar-date-value-item-number`}>
                {getDateNumber(item)}
              </span>
              <span className={`calendar-date-value-item-week`}>
                {getDateWeekDay(item)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`calendar-date-operation-container calendar-date-operation-right-container`}
      >
        <img alt={`right`} src={CalendarLeftPng} />
      </div>
    </div>
  );
};

export default CalendarDate;
