import React from 'react';

import { WEEKDAYS } from '../../constants';
import { Text } from '../Text';
import {
    calendarBodyContainer,
    calendarContainer,
    calendarHeaderContainer,
    dayCell,
    daysContainer,
    monthControlButton,
    weekCell,
    weekdaysContainer,
} from './CalendarStyle';
import type { CalendarProps } from './types';
import { useCalendar } from './useCalendar';

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
    const {
        today,
        days,
        currentDate,
        newSelectedDate,
        handleBackMonth,
        handleNextMonth,
        handleSelectedDate,
    } = useCalendar(selectedDate, isMultiple, onSelect);
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
                <button
                    onClick={handleBackMonth}
                    aria-label="이전 달"
                    disabled={disabled}
                    css={monthControlButton}
                >
                    {'<'}
                </button>
                <Text as="div" type="bodySemibold" aria-label={currentDate.format('YYYY년 MM월')}>
                    {currentDate.format('YYYY년 MM월')}
                </Text>
                <button
                    onClick={handleNextMonth}
                    aria-label="다음 달"
                    disabled={disabled}
                    css={monthControlButton}
                >
                    {'>'}
                </button>
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
                                newSelectedDate.has(date.dateString),
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
