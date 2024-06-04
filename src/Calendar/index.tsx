import CalendarDate from 'anystay-ui/Calendar/components/CalendarDate';
import CalendarTable from 'anystay-ui/Calendar/components/CalendarTable';
import CalendarTitle from 'anystay-ui/Calendar/components/CalendarTitle';
import {
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_DATE_ROW_HEIGHT,
  DEFAULT_DAY_NUMBER,
  DEFAULT_STEP_DAY_NUMBER,
  DEFAULT_SUBTRACT_DAY_NUMBER,
  DEFAULT_TITLE_ROW_HEIGHT,
} from 'anystay-ui/Calendar/constant';
import { CalendarMonthDate, CalendarProp } from 'anystay-ui/Calendar/interface';
import 'anystay-ui/Calendar/style.less';
import { generateMonthDate, onCustomScroll } from 'anystay-ui/Calendar/util';
import React, { useEffect, useState, type FC } from 'react';
import { ScrollSync } from 'react-virtualized';
import 'react-virtualized/styles.css';

const Calendar: FC<CalendarProp> = (props) => {
  const dayNumber = props.dayNumber || DEFAULT_DAY_NUMBER;
  const subtractDayNumber =
    props.subtractDayNumber || DEFAULT_SUBTRACT_DAY_NUMBER;
  const stepDayNumber = props.stepDayNumber || DEFAULT_STEP_DAY_NUMBER;
  const columnWidth = props.columnWidth || DEFAULT_COLUMN_WIDTH;
  const titleRowHeight = props.titleRowHeight || DEFAULT_TITLE_ROW_HEIGHT;
  const dateRowHeight = props.dateRowHeight || DEFAULT_DATE_ROW_HEIGHT;

  const [monthDate, setMonthDate] = useState<CalendarMonthDate>({});
  const [customScrollLeft, setCustomScrollLeft] = useState<number>(
    (subtractDayNumber - 2) * columnWidth,
  );

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
          scrollTop,
          scrollWidth,
        }) => (
          <div className={`calendar-container`}>
            <CalendarTitle
              monthDate={monthDate}
              columnWidth={columnWidth}
              titleRowHeight={titleRowHeight}
              clientHeight={clientHeight}
              clientWidth={clientWidth}
              onScroll={(sp) => {
                onCustomScroll(sp, setCustomScrollLeft, onScroll);
              }}
              scrollHeight={scrollHeight}
              scrollLeft={customScrollLeft}
              scrollTop={scrollTop}
              scrollWidth={scrollWidth}
            />
            <CalendarDate
              monthDate={monthDate}
              dayNumber={dayNumber}
              stepDayNumber={stepDayNumber}
              columnWidth={columnWidth}
              dateRowHeight={dateRowHeight}
              clientHeight={clientHeight}
              clientWidth={clientWidth}
              onScroll={(sp) => {
                onCustomScroll(sp, setCustomScrollLeft, onScroll);
              }}
              scrollHeight={scrollHeight}
              scrollLeft={customScrollLeft}
              scrollTop={scrollTop}
              scrollWidth={scrollWidth}
              setCustomScrollLeft={setCustomScrollLeft}
            />
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
              onScroll={(sp) => {
                onCustomScroll(sp, setCustomScrollLeft, onScroll);
              }}
              scrollHeight={scrollHeight}
              scrollLeft={customScrollLeft}
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
