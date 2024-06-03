import CalendarDate from 'anystay-ui/Calendar/components/CalendarDate';
import CalendarTable from 'anystay-ui/Calendar/components/CalendarTable';
import CalendarTitle from 'anystay-ui/Calendar/components/CalendarTitle';
import {
  DEFAULT_DAY_NUMBER,
  DEFAULT_SUBTRACT_DAY_NUMBER,
} from 'anystay-ui/Calendar/constant';
import { CalendarProp } from 'anystay-ui/Calendar/interface';
import 'anystay-ui/Calendar/style.less';
import { generateDates } from 'anystay-ui/Calendar/util';
import React, { useEffect, useState, type FC } from 'react';

const Calendar: FC<CalendarProp> = (props) => {
  const dayNumber = props.dayNumber || DEFAULT_DAY_NUMBER;
  const subtractDayNumber =
    props.subtractDayNumber || DEFAULT_SUBTRACT_DAY_NUMBER;

  const [firstMonthDates, setFirstMonthDates] = useState<string[]>([]);
  const [secondMonthDates, setSecondMonthDates] = useState<string[]>([]);
  const [elementWidth, setElementWidth] = useState<number>(0);

  useEffect(() => {
    const dates = generateDates(dayNumber, subtractDayNumber);
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
        dayNumber={dayNumber}
      />

      {/* table */}
      <CalendarTable
        rows={props.rows}
        elementWidth={elementWidth}
        dayNumber={dayNumber}
        subtractDayNumber={subtractDayNumber}
        fillRows={props.fillRows}
        onSelect={props.onSelect}
      />
    </div>
  );
};

export default Calendar;

export { CalendarSelectStatusProp } from './interface';
