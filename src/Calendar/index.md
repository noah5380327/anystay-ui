# Calendar

This is an example component.

```jsx
import { Calendar, CalendarSelectStatusProp } from 'anystay-ui';

export default () => (
  <Calendar
    rows={[
      { itemId: 1, price: 145 },
      { itemId: 2, price: 145 },
    ]}
    fillRows={[
      {
        itemId: 1,
        items: [
          {
            startDate: '2024-06-03',
            endDate: '2024-06-03',
            status: CalendarSelectStatusProp.Block,
            price: 125,
          },
        ],
      },
    ]}
  />
);
```
