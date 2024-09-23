# Calendar

This is an example component.

```tsx
import { Calendar, CalendarSelectProp, CalendarType } from 'anystay-ui';

//monthly use totalMonthNumber
//day use totalDayNUmber

export default () => (
  <Calendar
    type={CalendarType.Month}
    subtractDayNumber={0}
    totalDayNumber={50}
    totalMonthNumber={2}
    rows={[
      { rowId: 1, value: 145 },
      { rowId: 2, value: 145 },
    ]}
    fillRows={[
      {
        rowId: 1,
        columns: [
          {
            startDate: '2024-09-15',
            endDate: '2024-09-16',
            value: 185,
          },
        ],
      },
    ]}
    blockRows={[
      {
        rowId: 1,
        columns: [
          {
            startDate: '2024-09-18',
            endDate: '2024-09-19',
            value: 125,
          },
          {
            startDate: '2024-09-20',
            endDate: '2024-09-21',
            value: 125,
          },
        ],
      },
      {
        rowId: 2,
        columns: [
          {
            startDate: '2024-09-05',
            endDate: '2024-09-07',
            value: 125,
          },
        ],
      },
    ]}
    occupiedRows={[
      {
        rowId: 1,
        columns: [
          {
            startDate: '2024-09-22 13:00:00',
            endDate: '2024-09-23 15:00:00',
            name: 'John',
            text: 'Confirmed',
            link: 'https://www.baidu.com',
            avatar: 'http://localhost:4000/favicon.ico',
            color: '#FFA01D',
          },
          {
            startDate: '2024-09-23 17:00:00',
            endDate: '2024-09-25 15:00:00',
            name: 'John',
            text: 'Confirmed',
            link: 'https://www.baidu.com',
            avatar: 'http://localhost:4000/favicon.ico',
          },
        ],
      },
    ]}
    onSelect={(prop: CalendarSelectProp) => {
      console.log(prop);
    }}
    onOccupiedClick={(prop: string) => {
      console.log(prop);
    }}
  />
);
```
