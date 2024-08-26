# Calendar

This is an example component.

```tsx
import {
  Calendar,
  CalendarSelectProp,
  CalendarType,
} from 'anystay-ui';

export default () => (
  <Calendar
    type={CalendarType.Month}
    subtractDayNumber={0}
    totalDayNumber={50}
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
            endDate: '2024-09-25 15:00:00',
            name: 'John',
            text: 'Confirmed',
            link: 'https://www.baidu.com',
            // avatar: 'https://s3-alpha-sig.figma.com/img/1fa2/edb0/81c8877374f25ad15c48cecde45f837e?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UirwkH9-FZzRehteWzCA~FoOzH5wFr2Ktr2MM0hZGm8ozGdL~cmiCDVIbg0vN0zmZ-fbiGeBGMd1oSiVHUk9ZbQI7yAUmPAc1us1GQPpZcJkHB141tG-Cx81aIJJ0qMgzAOmTrn9mOHZaeIJaKN9Mc44~ZLvVpV-859ReJxuZlgp2W1r6~k8w68IRwYTUsGPbB~2jIGDYYBUnvUxgqFmR68YDFLP8QY2rlMyf7SLWHtki~gm5A2xOTN4flwKVbRoFUQpgyWex0p1PrbWo57qrg8LJsUMlkZdG~JH~WYwyNNXJoOUELypMJdDdM1uzdMDM5bFAWR7BXGS0uHdAzt1RA__',
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
