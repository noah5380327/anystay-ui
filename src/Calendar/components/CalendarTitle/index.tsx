import { CalendarTitleProp } from 'anystay-ui/Calendar/components/CalendarTitle/interface';
import 'anystay-ui/Calendar/components/CalendarTitle/style.less';
import {
  getBorderStyle,
  getDateName,
} from 'anystay-ui/Calendar/components/CalendarTitle/util';
import React, { type FC } from 'react';

const CalendarTitle: FC<CalendarTitleProp> = (props) => {
  return (
    <div className={`calendar-title-container`}>
      <div className={`calendar-title-text-container`}>
        {Object.keys(props.monthDate).map((key) => (
          <span
            key={key}
            className={`calendar-title-text
            ${getBorderStyle(props, key)}`}
            style={{ width: props.columnWidth * props.monthDate[key].length }}
          >
            {getDateName(key)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CalendarTitle;
