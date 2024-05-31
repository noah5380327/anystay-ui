import CalendarDate from 'anystay-ui/Calendar/components/CalendarDate';
import CalendarTable from 'anystay-ui/Calendar/components/CalendarTable';
import CalendarTitle from 'anystay-ui/Calendar/components/CalendarTitle';
import { CalendarProp } from 'anystay-ui/Calendar/interface';
import 'anystay-ui/Calendar/style.less';
import { generateDates } from 'anystay-ui/Calendar/util';
import React, { useEffect, useState, type FC } from 'react';

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
