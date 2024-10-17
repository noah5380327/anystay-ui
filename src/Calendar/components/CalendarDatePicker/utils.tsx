import { CalendarDayTitleDate } from 'anystay-ui/Calendar/components/CalendarDatePicker/interface';
import { CalendarDayTitleProp } from 'anystay-ui/Calendar/components/CalendarDayTitle/interface';
import { CalendarMonthTitleProp } from 'anystay-ui/Calendar/components/CalendarMonthTitle/interface';
import { CalendarMonthDate } from 'anystay-ui/Calendar/interface';
import dayjs from 'dayjs';
export function reSetScrollLeft(
  date: string,
  props: CalendarDayTitleProp,
  titleDate: CalendarDayTitleDate,
) {
  const selectedDate = dayjs(date).startOf('month');
  const firstDate = dayjs(titleDate.firstDate);
  const diffDays = selectedDate.diff(firstDate, 'days');
  const scrollLeft = diffDays * props.columnWidth;
  props.setCustomScrollLeft(scrollLeft > 0 ? scrollLeft : 0);
  props.setShowReturnToToday(false);
}

export function reSetScrollTop(
  props: CalendarMonthTitleProp,
  selectedDate: dayjs.Dayjs,
  monthDate: CalendarMonthDate,
  scrollWidth: number,
) {
  function getRowsUntilThisMonth(year: number, month: number) {
    // 获取该月的第一天
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 星期天是0，星期一是1，...
    // 获取该月的最后一天
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate(); // 获取该月天数
    // 计算需要多少行（周）
    const totalCells = totalDaysInMonth + firstDayOfWeek; // 天数 + 偏移量
    const numberOfRows = Math.ceil(totalCells / 7); // 每行7天
    return numberOfRows;
  }

  const months = Object.keys(monthDate);
  let numberOfRow = 0;
  for (let i = 0; i < months.length; i++) {
    if (selectedDate.format('YYYY-MM') === months[i]) {
      let scrollTop = numberOfRow * (scrollWidth / 7);
      props.setCustomScrollTop(scrollTop);
    }
    const year = Number(months[i].split('-')[0]);
    const month = Number(months[i].split('-')[1]) - 1;
    numberOfRow += getRowsUntilThisMonth(year, month) + 1; //title take 1 row
  }
}
