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
    subtractMonthNumber={10}
    totalMonthNumber={20}
    blockCells={['2024-10-18', '2024-11-20']}
    onSelect={(prop: DatePickerSelectProp) => {
      console.log(prop);
    }}
    minRange={4}
    maxRange={15}
  />
);
```
