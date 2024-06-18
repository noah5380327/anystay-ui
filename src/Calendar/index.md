# Calendar

This is an example component.

```tsx
import {
  Calendar,
  CalendarColumnStatusProp,
  CalendarSelectProp,
} from 'anystay-ui';

export default () => (
  <Calendar
    subtractDayNumber={730}
    totalDayNumber={1095}
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
          {
            startDate: '2024-06-20 13:00:00',
            endDate: '2024-06-25 15:00:00',
            status: CalendarColumnStatusProp.Occupied,
            value: 125,
            avatar: 'https://s3-alpha-sig.figma.com/img/1fa2/edb0/81c8877374f25ad15c48cecde45f837e?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UirwkH9-FZzRehteWzCA~FoOzH5wFr2Ktr2MM0hZGm8ozGdL~cmiCDVIbg0vN0zmZ-fbiGeBGMd1oSiVHUk9ZbQI7yAUmPAc1us1GQPpZcJkHB141tG-Cx81aIJJ0qMgzAOmTrn9mOHZaeIJaKN9Mc44~ZLvVpV-859ReJxuZlgp2W1r6~k8w68IRwYTUsGPbB~2jIGDYYBUnvUxgqFmR68YDFLP8QY2rlMyf7SLWHtki~gm5A2xOTN4flwKVbRoFUQpgyWex0p1PrbWo57qrg8LJsUMlkZdG~JH~WYwyNNXJoOUELypMJdDdM1uzdMDM5bFAWR7BXGS0uHdAzt1RA__',
            name: 'John',
            text: 'Confirmed',
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
    onSelect={(prop: CalendarSelectProp) => {
      console.log(prop);
    }}
  />
);
```
