# Calendar

This is an example component.

```jsx
import { Calendar, CalendarColumnStatusProp } from 'anystay-ui';

export default () => (
  <Calendar
    rows={[
      { rowId: 1, value: 145 },
      { rowId: 2, value: 145 },
    ]}
    fillRows={[
      {
        rowId: 1,
        columns: [
          {
            startDate: '2024-06-02',
            endDate: '2024-06-03',
            status: CalendarColumnStatusProp.Block,
            value: 125,
          },
          {
            startDate: '2024-06-05',
            endDate: '2024-06-07',
            status: CalendarColumnStatusProp.Block,
            value: 125,
          },
        ],
      },
      {
        rowId: 2,
        columns: [
          {
            startDate: '2024-06-05',
            endDate: '2024-06-07',
            status: CalendarColumnStatusProp.Block,
            value: 125,
          },
        ],
      },
    ]}
  />
);
```
