# DatePicker

This is an example component.

```tsx
import { DatePickerSelectProp, DatePicker } from 'anystay-ui';

//monthly use totalMonthNumber
//day use totalDayNUmber

//for day calendar
//subtractDayNumber={0}

//for day calendar
//totalDayNumber={50}

//for month calendar
//subtractMonthNumber={0}

//for month calendar
//totalMonthNumber={10}

//day calendar can have multiple row, monthly canlendar only have one row
//rows={[{ rowId: 1, value: 145 }]}

export default () => (
  <DatePicker
    value={['2024-12-01', '2024-12-05']}
    subtractMonthNumber={10}
    totalMonthNumber={20}
    blockCells={[
      '2024-11-18',
      '2024-11-19',
      '2024-11-20',
      '2024-11-22',
      '2024-11-23',
      '2024-11-28',
    ]}
    onSelect={(prop: DatePickerSelectProp) => {
      console.log(prop);
    }}
    minRange={2}
  />
);
```
