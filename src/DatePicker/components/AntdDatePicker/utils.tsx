import { DatePickerTitleProp } from 'anystay-ui/DatePicker/components/DatePickerTitle/interface';
import { DatePickerMonthDate } from 'anystay-ui/DatePicker/interface';
import dayjs from 'dayjs';

export function reSetScrollTop(
  props: DatePickerTitleProp,
  selectedDate: dayjs.Dayjs,
  monthDate: DatePickerMonthDate,
  cellHeightMonthly: number,
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
      let scrollTop = numberOfRow * cellHeightMonthly;
      props.setCustomScrollTop(scrollTop);
    }
    const year = Number(months[i].split('-')[0]);
    const month = Number(months[i].split('-')[1]) - 1;
    numberOfRow += getRowsUntilThisMonth(year, month) + 1; //title take 1 row
  }
}
