import { ConfigProvider } from 'antd';
import CalendarDate from 'anystay-ui/Calendar/components/CalendarDate';
import CalendarTable from 'anystay-ui/Calendar/components/CalendarTable';
import CalendarTitle from 'anystay-ui/Calendar/components/CalendarTitle';
import {
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_DATE_ROW_HEIGHT,
  DEFAULT_STEP_DAY_NUMBER,
  DEFAULT_SUBTRACT_DAY_NUMBER,
  DEFAULT_TITLE_ROW_HEIGHT,
  DEFAULT_TOTAL_DAY_NUMBER,
} from 'anystay-ui/Calendar/constant';
import { CalendarMonthDate, CalendarProp } from 'anystay-ui/Calendar/interface';
import { generateMonthDate, onCustomScroll } from 'anystay-ui/Calendar/util';
import React, { useEffect, useState, type FC } from 'react';
import { ScrollSync } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './style.less';

const Calendar: FC<CalendarProp> = (props) => {
  const totalDayNumber = props.totalDayNumber || DEFAULT_TOTAL_DAY_NUMBER;
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
  const [showReturnToToday, setShowReturnToToday] = useState<boolean>(false);
  const [forceClearSelect, setForceClearSelect] = useState<boolean>(false);

  useEffect(() => {
    const date = generateMonthDate(totalDayNumber, subtractDayNumber);
    setMonthDate(date);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function clearSelect() {
    setForceClearSelect(true);
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1d1d1f',
        },
      }}
    >
      {Object.keys(monthDate).length > 0 && (
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
                  onCustomScroll(
                    sp,
                    customScrollLeft,
                    setCustomScrollLeft,
                    onScroll,
                    setShowReturnToToday,
                    subtractDayNumber,
                    columnWidth,
                  );
                }}
                scrollHeight={scrollHeight}
                scrollLeft={customScrollLeft}
                scrollTop={scrollTop}
                scrollWidth={scrollWidth}
                setCustomScrollLeft={setCustomScrollLeft}
                showReturnToToday={showReturnToToday}
                setShowReturnToToday={setShowReturnToToday}
              />
              <CalendarDate
                monthDate={monthDate}
                totalDayNumber={totalDayNumber}
                stepDayNumber={stepDayNumber}
                columnWidth={columnWidth}
                dateRowHeight={dateRowHeight}
                clientHeight={clientHeight}
                clientWidth={clientWidth}
                onScroll={(sp) => {
                  onCustomScroll(
                    sp,
                    customScrollLeft,
                    setCustomScrollLeft,
                    onScroll,
                    setShowReturnToToday,
                    subtractDayNumber,
                    columnWidth,
                  );
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
                totalDayNumber={totalDayNumber}
                subtractDayNumber={subtractDayNumber}
                fillRows={props.fillRows}
                onSelect={props.onSelect}
                clientHeight={clientHeight}
                clientWidth={clientWidth}
                onScroll={(sp) => {
                  onCustomScroll(
                    sp,
                    customScrollLeft,
                    setCustomScrollLeft,
                    onScroll,
                    setShowReturnToToday,
                    subtractDayNumber,
                    columnWidth,
                  );
                }}
                scrollHeight={scrollHeight}
                scrollLeft={customScrollLeft}
                scrollTop={scrollTop}
                scrollWidth={scrollWidth}
                setCustomScrollLeft={setCustomScrollLeft}
                showReturnToToday={showReturnToToday}
                setShowReturnToToday={setShowReturnToToday}
                forceClearSelect={forceClearSelect}
                setForceClearSelect={setForceClearSelect}
              />
            </div>
          )}
        </ScrollSync>
      )}
    </ConfigProvider>
  );
};

export default Calendar;
