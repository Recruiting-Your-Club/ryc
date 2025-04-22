import React from 'react';
import {
    calendarContainer,
    calendarBodyContainer,
    calendarHeaderContainer,
    weekdaysContainer,
    daysContainer,
    dayCell,
    weekCell,
} from './CalendarStyle';
import { Button, Text } from '@components';
import { useCalendar } from './useCalendar';
import type { CalendarProps } from './types';
import { WEEKDAYS } from '@constants/calendar';

const Calendar = ({
    isMultiple = false,
    selectedDate = [],
    onSelect = () => {},
    disabled = false,
    size = 'lg',
    border = false,
    shadow = true,
    zIndex,
    sx = {},
}: CalendarProps) => {
    // prop destruction
    const { today, days, currentDate, handleBackMonth, handleNextMonth, handleSelectedDate } =
        useCalendar(selectedDate, isMultiple, onSelect);
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects

    return (
        <div css={[calendarContainer({ size, border, shadow, zIndex }), sx]}>
            <div css={calendarHeaderContainer}>
                <Button variant="transparent" onClick={handleBackMonth} aria-label="이전 달">
                    {'<'}
                </Button>
                <Text as="div" type="bodySemibold" aria-label={currentDate.format('YYYY년 MM월')}>
                    {currentDate.format('YYYY년 MM월')}
                </Text>
                <Button variant="transparent" onClick={handleNextMonth} aria-label="다음 달">
                    {'>'}
                </Button>
            </div>

            <div css={calendarBodyContainer}>
                <div css={weekdaysContainer}>
                    {WEEKDAYS.map((day, index) => (
                        <div key={day} css={weekCell(index)}>
                            {day}
                        </div>
                    ))}
                </div>

                <div css={daysContainer}>
                    {days.map((date) => (
                        <button
                            aria-label={date.dateString}
                            disabled={disabled}
                            key={date.dateString}
                            css={dayCell(
                                selectedDate.includes(date.dateString),
                                date.weekend,
                                date.dateString === today,
                                date.isCurrentMonth,
                                disabled,
                            )}
                            onClick={() => handleSelectedDate(date.dateString)}
                        >
                            {date.day}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { Calendar };
