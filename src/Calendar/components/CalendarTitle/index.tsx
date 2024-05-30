import { CalendarTitleProp } from 'anystay-ui/Calendar/components/CalendarTitle/interface';
import 'anystay-ui/Calendar/components/CalendarTitle/style.less';
import moment from 'moment';
import React, { type FC } from 'react';

function getDateName(value: string): string {
  return `${moment(value).format('MMMM')} ${moment(value).format('YYYY')}`;
}

function getFirstMonthDatesAdditionalStyle(props: CalendarTitleProp): string {
  return props.secondMonthDates.length > 0 ? 'calendar-title-text-border' : '';
}

const CalendarTitle: FC<CalendarTitleProp> = (props) => {
  const firstMonthWidth = props.elementWidth * props.firstMonthDates.length;
  const secondMonthWidth = props.elementWidth * props.secondMonthDates.length;

  return (
    <div className={`calendar-title-container`}>
      <div className={`calendar-title-text-container`}>
        {props.firstMonthDates.length > 0 && (
          <span
            className={`calendar-title-text
             ${getFirstMonthDatesAdditionalStyle(props)}`}
            style={{ width: firstMonthWidth }}
          >
            {getDateName(props.firstMonthDates[0])}
          </span>
        )}
        {props.secondMonthDates.length > 0 && (
          <span
            className={`calendar-title-text`}
            style={{ width: secondMonthWidth }}
          >
            {getDateName(props.secondMonthDates[0])}
          </span>
        )}
      </div>
    </div>
  );
};

export default CalendarTitle;
