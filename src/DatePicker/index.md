# Calendar

This is an example component.

```tsx
import { CalendarSelectProp, DatePicker } from 'anystay-ui';

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
    cellHeightMonthly={80}
    blockRows={['2024-10-18', '2024-10-20']}
    onSelect={(prop: CalendarSelectProp | CalendarMonthlySelectprop) => {
      console.log(prop);
    }}
    onOccupiedClick={(prop: string) => {
      console.log(prop);
    }}
  />
);
```
