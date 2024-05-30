import CalendarDate from 'anystay-ui/Calendar/components/CalendarDate';
import CalendarTable from 'anystay-ui/Calendar/components/CalendarTable';
import CalendarTitle from 'anystay-ui/Calendar/components/CalendarTitle';
import { CalendarDates, CalendarProp } from 'anystay-ui/Calendar/interface';
import 'anystay-ui/Calendar/style.less';
import moment from 'moment/moment';
import React, { useEffect, useState, type FC } from 'react';

function generateDates(): CalendarDates {
  const today = moment();

  const dates = [];
  const monthDates1: string[] = [];
  const monthDates2: string[] = [];
  for (let i = 0; i < 14; i++) {
    dates.push(today.clone().add(i, 'days'));
  }

  const firstMonthNumber = dates[0].month();

  dates.forEach((date) => {
    if (date.month() === firstMonthNumber) {
      monthDates1.push(date.format('YYYY-MM-DD'));
    } else {
      monthDates2.push(date.format('YYYY-MM-DD'));
    }
  });

  return {
    firstMonthDates: monthDates1,
    secondMonthDates: monthDates2,
  };
}

const Calendar: FC<CalendarProp> = () => {
  const [firstMonthDates, setFirstMonthDates] = useState<string[]>([]);
  const [secondMonthDates, setSecondMonthDates] = useState<string[]>([]);
  const [elementWidth, setElementWidth] = useState<number>(0);

  useEffect(() => {
    const dates = generateDates();
    setFirstMonthDates(dates.firstMonthDates);
    setSecondMonthDates(dates.secondMonthDates);
  }, []);

  return (
    <div className={`calendar-container`}>
      {/* title */}
      <CalendarTitle
        firstMonthDates={firstMonthDates}
        secondMonthDates={secondMonthDates}
        elementWidth={elementWidth}
      />

      {/* date */}
      <CalendarDate
        firstMonthDates={firstMonthDates}
        secondMonthDates={secondMonthDates}
        setElementWidth={setElementWidth}
      />

      {/* table */}
      <CalendarTable rowNumber={3} elementWidth={elementWidth} />
    </div>
  );
};

export default Calendar;
