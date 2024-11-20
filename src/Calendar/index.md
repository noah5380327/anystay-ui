# Calendar

This is an example component.

```tsx
import { Calendar, CalendarSelectProp, CalendarType } from 'anystay-ui';

//monthly use totalMonthNumber
//day use totalDayNUmber

//calendar type
//type={CalendarType.Day}

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
  <Calendar
    type={CalendarType.Month}
    subtractDayNumber={48}
    subtractMonthNumber={10}
    totalDayNumber={100}
    totalMonthNumber={20}
    cellHeightMonthly={80}
    rows={[{ rowId: 1, value: 200 }]}
    fillRows={[
      {
        rowId: 1,
        columns: [
          {
            startDate: '2024-10-15',
            endDate: '2024-10-16',
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
            startDate: '2024-10-18',
            endDate: '2024-10-19',
            value: 125,
          },
          {
            startDate: '2024-10-20',
            endDate: '2024-10-21',
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
            startDate: '2024-11-22 16:00:00',
            endDate: '2024-11-23 15:00:00',
            name: 'John',
            text: 'Confirmed',
            link: 'https://www.aaa.com',
            avatar: 'http://localhost:4000/favicon.ico',
            color: '#FFA01D',
          },
          {
            startDate: '2024-11-23 16:00:00',
            endDate: '2024-11-24 15:00:00',
            name: 'John',
            text: 'Confirmed',
            link: 'https://www.bbb.com',
            avatar: 'http://localhost:4000/favicon.ico',
            color: '#FFA01D',
          },
          {
            startDate: '2024-11-24 16:00:00',
            endDate: '2024-11-25 15:00:00',
            name: 'John',
            text: 'Confirmed',
            link: 'https://www.ccc.com',
            avatar: 'http://localhost:4000/favicon.ico',
            color: '#FFA01D',
          },
          {
            startDate: '2024-11-27 16:00:00',
            endDate: '2024-11-30 15:00:00',
            name: 'John',
            text: 'Confirmed',
            link: 'https://www.ddd.com',
            avatar: 'http://localhost:4000/favicon.ico',
            color: '#FFA01D',
          },
        ],
      },
    ]}
    onSelect={(prop: CalendarSelectProp | CalendarMonthlySelectprop) => {
      console.log(prop);
    }}
    onOccupiedClick={(prop: string) => {
      console.log(prop);
    }}
  />
);
```
