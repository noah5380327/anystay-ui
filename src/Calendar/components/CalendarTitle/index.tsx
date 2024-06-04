import { CalendarTitleProp } from 'anystay-ui/Calendar/components/CalendarTitle/interface';
import 'anystay-ui/Calendar/components/CalendarTitle/style.less';
import {
  generateTitleCells,
  getBorderStyle,
  getDateName,
} from 'anystay-ui/Calendar/components/CalendarTitle/util';
import React, { type FC } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';

const CalendarTitle: FC<CalendarTitleProp> = (props) => {
  const titleRowHeight = 45;
  const titleCells = generateTitleCells(props);

  return (
    <div className={`calendar-title-container`}>
      <AutoSizer disableHeight>
        {({ width }) => (
          <Grid
            width={width}
            height={titleRowHeight}
            columnCount={titleCells.length}
            columnWidth={({ index }) => {
              return props.columnWidth * titleCells[index].dates.length;
            }}
            rowCount={1}
            rowHeight={titleRowHeight}
            clientHeight={props.clientHeight}
            clientWidth={props.clientWidth}
            onScroll={props.onScroll}
            scrollHeight={props.scrollHeight}
            scrollLeft={props.scrollLeft}
            scrollTop={props.scrollTop}
            scrollWidth={props.scrollWidth}
            style={{ overflow: 'hidden' }}
            cellRenderer={({ columnIndex, key, style }) => (
              <span
                key={key}
                className={`calendar-title-text
                ${getBorderStyle(props, titleCells[columnIndex])}`}
                style={style}
              >
                &nbsp;{getDateName(titleCells[columnIndex])}
              </span>
            )}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default CalendarTitle;
