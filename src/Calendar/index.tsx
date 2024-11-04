import { ConfigProvider } from 'antd';
import CalendarDayDate from 'anystay-ui/Calendar/components/CalendarDayDate';
import CalendarDayTable from 'anystay-ui/Calendar/components/CalendarDayTable';
import CalendarDayTitle from 'anystay-ui/Calendar/components/CalendarDayTitle';
import CalendarMonthTable from 'anystay-ui/Calendar/components/CalendarMonthTable';
import CalendarMonthTitle from 'anystay-ui/Calendar/components/CalendarMonthTitle';
import {
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_DATE_ROW_HEIGHT,
  DEFAULT_STEP_DAY_NUMBER,
  DEFAULT_SUBTRACT_DAY_NUMBER,
  DEFAULT_SUBTRACT_MONTH_NUMBER,
  DEFAULT_TABLE_HEIGHT,
  DEFAULT_TITLE_ROW_HEIGHT,
  DEFAULT_TOTAL_DAY_NUMBER,
  DEFAULT_TOTAL_MONTH_NUMBER,
  DEFAULT_TYPE,
} from 'anystay-ui/Calendar/constant';
import {
  CalendarMonthDate,
  CalendarProp,
  CalendarType,
} from 'anystay-ui/Calendar/interface';
import {
  generateMonthDate,
  generateMonthDateForMonthly,
  onCustomDayScroll,
  onCustomMonthScroll,
} from 'anystay-ui/Calendar/util';
import dayjs from 'dayjs';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ScrollSync } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './style.less';

const Calendar = forwardRef<HTMLInputElement, CalendarProp>((props, ref) => {
  const totalDayNumber = props.totalDayNumber || DEFAULT_TOTAL_DAY_NUMBER;
  const totalMonthNumber = props.totalMonthNumber || DEFAULT_TOTAL_MONTH_NUMBER;
  const subtractDayNumber =
    props.subtractDayNumber || DEFAULT_SUBTRACT_DAY_NUMBER;
  const subtractMonthNumber =
    props.subtractMonthNumber || DEFAULT_SUBTRACT_MONTH_NUMBER;
  const stepDayNumber = props.stepDayNumber || DEFAULT_STEP_DAY_NUMBER;
  const columnWidth = props.columnWidth || DEFAULT_COLUMN_WIDTH;

  const titleRowHeight = props.titleRowHeight || DEFAULT_TITLE_ROW_HEIGHT;
  const dateRowHeight = props.dateRowHeight || DEFAULT_DATE_ROW_HEIGHT;
  const type = props.type || DEFAULT_TYPE;
  const tableHeight = props.tableHeight || DEFAULT_TABLE_HEIGHT;

  const [monthDate, setMonthDate] = useState<CalendarMonthDate>({});
  const [monthDateForMonthly, setMonthDateForMonthly] =
    useState<CalendarMonthDate>({});
  const [customScrollLeft, setCustomScrollLeft] = useState<number>(
    (subtractDayNumber - 2) * columnWidth,
  );
  const [customScrollTop, setCustomScrollTop] = useState<number>(0);
  const todayScrollTop = useRef(0);
  const [monthTitle, setMonthTitle] = useState<string>('');
  const [showReturnToToday, setShowReturnToToday] = useState<boolean>(false);
  const tableRef = useRef<HTMLInputElement>(null);

  const [monthlyTitleSelectedDate, setMonthlyTitleSelectedDate] =
    useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    const date = generateMonthDate(totalDayNumber, subtractDayNumber);
    setMonthDate(date);
  }, []);

  useEffect(() => {
    const date = generateMonthDateForMonthly(
      totalMonthNumber,
      subtractMonthNumber,
    );
    setMonthDateForMonthly(date);
  }, []);

  // @ts-ignore
  useImperativeHandle(ref, () => ({
    forceClearSelect: () => {
      if (tableRef.current) {
        // @ts-ignore
        tableRef.current.forceClearSelect();
      }
    },
  }));

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1d1d1f',
        },
      }}
    >
      {Object.keys(monthDate).length > 0 && type === CalendarType.Day && (
        <ScrollSync>
          {({
            clientHeight,
            clientWidth,
            onScroll,
            scrollHeight,
            scrollTop,
            scrollWidth,
          }) => (
            <div ref={ref} className={`calendar-container`}>
              <CalendarDayTitle
                monthDate={monthDate}
                columnWidth={columnWidth}
                titleRowHeight={titleRowHeight}
                clientHeight={clientHeight}
                clientWidth={clientWidth}
                onScroll={(sp) => {
                  onCustomDayScroll(
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
                type={type}
              />
              <CalendarDayDate
                monthDate={monthDate}
                totalDayNumber={totalDayNumber}
                stepDayNumber={stepDayNumber}
                columnWidth={columnWidth}
                dateRowHeight={dateRowHeight}
                clientHeight={clientHeight}
                clientWidth={clientWidth}
                onScroll={(sp) => {
                  onCustomDayScroll(
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
              <CalendarDayTable
                ref={tableRef}
                monthDate={monthDate}
                rows={props.rows}
                columnWidth={columnWidth}
                totalDayNumber={totalDayNumber}
                subtractDayNumber={subtractDayNumber}
                fillRows={props.fillRows}
                blockRows={props.blockRows}
                occupiedRows={props.occupiedRows}
                onSelect={props.onSelect}
                onOccupiedClick={props.onOccupiedClick}
                clientHeight={clientHeight}
                clientWidth={clientWidth}
                onScroll={(sp) => {
                  onCustomDayScroll(
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
            </div>
          )}
        </ScrollSync>
      )}

      {Object.keys(monthDateForMonthly).length > 0 &&
        type === CalendarType.Month && (
          <ScrollSync>
            {({
              clientHeight,
              clientWidth,
              onScroll,
              scrollHeight,
              scrollWidth,
              scrollLeft,
            }) => (
              <div ref={ref} className={`calendar-container`}>
                <CalendarMonthTitle
                  monthTitle={monthTitle}
                  monthDate={monthDateForMonthly}
                  type={type}
                  setCustomScrollTop={setCustomScrollTop}
                  todayScrollTop={todayScrollTop}
                  cellHeightMonthly={
                    props.cellHeightMonthly
                      ? Math.max(props.cellHeightMonthly, scrollWidth / 7)
                      : scrollWidth / 7
                  }
                  monthlyTitleSelectedDate={monthlyTitleSelectedDate}
                  setMonthlyTitleSelectedDate={setMonthlyTitleSelectedDate}
                />
                <CalendarMonthTable
                  todayScrollTop={todayScrollTop}
                  cellHeightMonthly={props.cellHeightMonthly}
                  ref={tableRef}
                  monthDate={monthDateForMonthly}
                  rows={props.rows}
                  tableHeight={tableHeight}
                  fillRows={props.fillRows}
                  blockRows={props.blockRows}
                  occupiedRows={props.occupiedRows}
                  onSelect={props.onSelect}
                  monthTitle={monthTitle}
                  setMonthTitle={setMonthTitle}
                  clientHeight={clientHeight}
                  clientWidth={clientWidth}
                  setMonthlyTitleSelectedDate={setMonthlyTitleSelectedDate}
                  onScroll={(sp) => {
                    onCustomMonthScroll(sp, setCustomScrollTop, onScroll);
                  }}
                  onOccupiedClick={props.onOccupiedClick}
                  setCustomScrollTop={setCustomScrollTop}
                  customScrollTop={customScrollTop}
                  scrollHeight={scrollHeight}
                  scrollLeft={scrollLeft}
                  scrollTop={customScrollTop}
                  scrollWidth={scrollWidth}
                  setShowReturnToToday={setShowReturnToToday}
                  showReturnToToday={showReturnToToday}
                />
              </div>
            )}
          </ScrollSync>
        )}
    </ConfigProvider>
  );
});

export default Calendar;
