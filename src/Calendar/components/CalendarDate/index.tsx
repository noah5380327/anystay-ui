// @ts-ignore
import CalendarLeftPng from 'anystay-ui/Calendar/assets/left.png';
import { CalendarDateProp } from 'anystay-ui/Calendar/components/CalendarDate/interface';
import 'anystay-ui/Calendar/components/CalendarDate/style.less';
import {
  getBorderStyle,
  getCurrentStyle,
  getDateNumber,
  getDateWeekDay,
} from 'anystay-ui/Calendar/components/CalendarDate/util';
import React, { type FC } from 'react';

const CalendarDate: FC<CalendarDateProp> = (props) => {
  return (
    <div className={`calendar-date-container`}>
      <div className={`calendar-date-operation-container`}>
        <img alt={`left`} src={CalendarLeftPng} />
      </div>
      <div className={`calendar-date-value-container`}>
        {Object.keys(props.monthDate).map((key) =>
          props.monthDate[key].map((date, dateIndex) => (
            <div
              key={date}
              className={`calendar-date-value-item-container
              ${getBorderStyle(props, key, dateIndex)}`}
              style={{
                minWidth: props.columnWidth,
                maxWidth: props.columnWidth,
              }}
            >
              <div
                className={`calendar-date-value-item-wrapper
                ${getCurrentStyle(date)}`}
              >
                <span className={`calendar-date-value-item-number`}>
                  {getDateNumber(date)}
                </span>
                <span className={`calendar-date-value-item-week`}>
                  {getDateWeekDay(date)}
                </span>
              </div>
            </div>
          )),
        )}
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
