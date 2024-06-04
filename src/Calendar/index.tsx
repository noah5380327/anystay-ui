import CalendarDate from 'anystay-ui/Calendar/components/CalendarDate';
import CalendarTable from 'anystay-ui/Calendar/components/CalendarTable';
import CalendarTitle from 'anystay-ui/Calendar/components/CalendarTitle';
import {
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_DAY_NUMBER,
  DEFAULT_SUBTRACT_DAY_NUMBER,
} from 'anystay-ui/Calendar/constant';
import { CalendarMonthDate, CalendarProp } from 'anystay-ui/Calendar/interface';
import 'anystay-ui/Calendar/style.less';
import { generateMonthDate } from 'anystay-ui/Calendar/util';
import React, { useEffect, useState, type FC } from 'react';
import { ScrollSync } from 'react-virtualized';
import 'react-virtualized/styles.css';

const Calendar: FC<CalendarProp> = (props) => {
  const dayNumber = props.dayNumber || DEFAULT_DAY_NUMBER;
  const subtractDayNumber =
    props.subtractDayNumber || DEFAULT_SUBTRACT_DAY_NUMBER;
  const columnWidth = props.columnWidth || DEFAULT_COLUMN_WIDTH;

  const [monthDate, setMonthDate] = useState<CalendarMonthDate>({});

  useEffect(() => {
    const date = generateMonthDate(dayNumber, subtractDayNumber);
    setMonthDate(date);
  }, []);

  return (
    Object.keys(monthDate).length > 0 && (
      <ScrollSync>
        {({
          clientHeight,
          clientWidth,
          onScroll,
          scrollHeight,
          scrollLeft,
          scrollTop,
          scrollWidth,
        }) => (
          <div className={`calendar-container`}>
            {/* title */}
            <CalendarTitle
              monthDate={monthDate}
              columnWidth={columnWidth}
              clientHeight={clientHeight}
              clientWidth={clientWidth}
              onScroll={onScroll}
              scrollHeight={scrollHeight}
              scrollLeft={scrollLeft}
              scrollTop={scrollTop}
              scrollWidth={scrollWidth}
            />

            {/* date */}
            <CalendarDate
              monthDate={monthDate}
              dayNumber={dayNumber}
              columnWidth={columnWidth}
              clientHeight={clientHeight}
              clientWidth={clientWidth}
              onScroll={onScroll}
              scrollHeight={scrollHeight}
              scrollLeft={scrollLeft}
              scrollTop={scrollTop}
              scrollWidth={scrollWidth}
            />

            {/* table */}
            <CalendarTable
              monthDate={monthDate}
              rows={props.rows}
              columnWidth={columnWidth}
              dayNumber={dayNumber}
              subtractDayNumber={subtractDayNumber}
              fillRows={props.fillRows}
              onSelect={props.onSelect}
              clientHeight={clientHeight}
              clientWidth={clientWidth}
              onScroll={onScroll}
              scrollHeight={scrollHeight}
              scrollLeft={scrollLeft}
              scrollTop={scrollTop}
              scrollWidth={scrollWidth}
            />
          </div>
        )}
      </ScrollSync>
    )
  );
};

export default Calendar;
