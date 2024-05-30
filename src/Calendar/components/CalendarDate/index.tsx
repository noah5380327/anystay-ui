// @ts-ignore
import CalendarLeftPng from 'anystay-ui/Calendar/assets/left.png';
import { CalendarDateProp } from 'anystay-ui/Calendar/components/CalendarDate/interface';
import 'anystay-ui/Calendar/components/CalendarDate/style.less';
import moment from 'moment/moment';
import React, { useEffect, useRef, type FC } from 'react';

function getDateNumber(value: string): number {
  return moment(value).date();
}

function getDateWeekDay(value: string): string {
  return moment(value).format('ddd');
}

function getFirstMonthDatesAdditionalStyle(
  props: CalendarDateProp,
  index: number,
): string {
  return props.secondMonthDates.length > 0 &&
    index === props.firstMonthDates.length - 1
    ? `calendar-date-value-item-border-container`
    : '';
}

const CalendarDate: FC<CalendarDateProp> = (props) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      // @ts-ignore
      const totalWidth = element.clientWidth;
      const elementWidth = totalWidth / 14;
      props.setElementWidth(elementWidth);
    }
  }, [props.firstMonthDates, props.secondMonthDates]);

  return (
    <div className={`calendar-date-container`}>
      <div className={`calendar-date-operation-container`}>
        <img alt={`left`} src={CalendarLeftPng} />
      </div>
      <div ref={elementRef} className={`calendar-date-value-container`}>
        {props.firstMonthDates.map((item, index) => (
          <div
            key={index}
            className={`calendar-date-value-item-container
            ${getFirstMonthDatesAdditionalStyle(props, index)}`}
          >
            <span className={`calendar-date-value-item-number`}>
              {getDateNumber(item)}
            </span>
            <span className={`calendar-date-value-item-week`}>
              {getDateWeekDay(item)}
            </span>
          </div>
        ))}
        {props.secondMonthDates.map((item, index) => (
          <div key={index} className={`calendar-date-value-item-container`}>
            <span className={`calendar-date-value-item-number`}>
              {getDateNumber(item)}
            </span>
            <span className={`calendar-date-value-item-week`}>
              {getDateWeekDay(item)}
            </span>
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
