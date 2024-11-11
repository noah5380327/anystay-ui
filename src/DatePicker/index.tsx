import { ConfigProvider } from 'antd';
import DatePickerTable from 'anystay-ui/DatePicker/components/DatePickerTable';
import DatePickerTitle from 'anystay-ui/DatePicker/components/DatePickerTitle';
import {
  DEFAULT_MAX_RANGE,
  DEFAULT_MIN_RANGE,
  DEFAULT_SUBTRACT_MONTH_NUMBER,
  DEFAULT_TABLE_HEIGHT,
  DEFAULT_TOTAL_MONTH_NUMBER,
} from 'anystay-ui/DatePicker/constant';
import {
  DatePickerMonthDate,
  DatePickerProp,
} from 'anystay-ui/DatePicker/interface';
import {
  generateMonthDateForMonthly,
  onCustomMonthScroll,
} from 'anystay-ui/DatePicker/util';
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

const DatePicker = forwardRef<HTMLInputElement, DatePickerProp>(
  (props, ref) => {
    const totalMonthNumber =
      props.totalMonthNumber || DEFAULT_TOTAL_MONTH_NUMBER;
    const subtractMonthNumber =
      props.subtractMonthNumber || DEFAULT_SUBTRACT_MONTH_NUMBER;
    const minRange = props.minRange || DEFAULT_MIN_RANGE;
    const maxRange = props.maxRange || DEFAULT_MAX_RANGE;

    const tableHeight = props.tableHeight || DEFAULT_TABLE_HEIGHT;

    const [monthDateForMonthly, setMonthDateForMonthly] =
      useState<DatePickerMonthDate>({});

    const [customScrollTop, setCustomScrollTop] = useState<number>(0);
    const todayScrollTop = useRef(0);
    const [monthTitle, setMonthTitle] = useState<string>('');
    const tableRef = useRef<HTMLInputElement>(null);

    const [monthlyTitleSelectedDate, setMonthlyTitleSelectedDate] =
      useState<dayjs.Dayjs>(dayjs());

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
        <ScrollSync>
          {({
            clientHeight,
            clientWidth,
            onScroll,
            scrollHeight,
            scrollWidth,
            scrollLeft,
          }) => (
            <div ref={ref} className={`date-picker-container`}>
              <DatePickerTitle
                monthTitle={monthTitle}
                monthDate={monthDateForMonthly}
                setCustomScrollTop={setCustomScrollTop}
                todayScrollTop={todayScrollTop}
                cellHeightMonthly={scrollWidth / 7}
                monthlyTitleSelectedDate={monthlyTitleSelectedDate}
                setMonthlyTitleSelectedDate={setMonthlyTitleSelectedDate}
              />
              <DatePickerTable
                value={props.value}
                minRange={minRange}
                maxRange={maxRange}
                todayScrollTop={todayScrollTop}
                cellHeightMonthly={props.cellHeightMonthly}
                ref={tableRef}
                monthDate={monthDateForMonthly}
                tableHeight={tableHeight}
                blockCells={props.blockCells}
                checkoutOnlyCells={props.checkoutOnlyCells}
                unavailableDueToMinimumStayCells={
                  props.unavailableDueToMinimumStayCells
                }
                onSelect={props.onSelect}
                monthTitle={monthTitle}
                setMonthTitle={setMonthTitle}
                clientHeight={clientHeight}
                clientWidth={clientWidth}
                setMonthlyTitleSelectedDate={setMonthlyTitleSelectedDate}
                onScroll={(sp) => {
                  onCustomMonthScroll(sp, setCustomScrollTop, onScroll);
                }}
                setCustomScrollTop={setCustomScrollTop}
                customScrollTop={customScrollTop}
                scrollHeight={scrollHeight}
                scrollLeft={scrollLeft}
                scrollTop={customScrollTop}
                scrollWidth={scrollWidth}
              />
            </div>
          )}
        </ScrollSync>
      </ConfigProvider>
    );
  },
);

export default DatePicker;
