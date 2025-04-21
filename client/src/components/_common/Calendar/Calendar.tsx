import React, { useState, useEffect } from 'react';
import {
    calendarContainer,
    calendarBodyContainer,
    calendarHeaderContainer,
    weekdaysContainer,
    daysContainer,
    dayCell,
    weekCell,
} from './CalendarStyle';
import { Button } from '@components';
import { Text } from '@components/_common';
import dayjs from 'dayjs';
import { useCalendar } from './useCalendar';
import type { CalendarProps, CalendarData } from './types';

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
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
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
                    {weekdays.map((day, index) => (
                        <div key={day} css={weekCell(index)}>
                            {day}
                        </div>
                    ))}
                </div>

                <div css={daysContainer}>
                    {days.map((date, index) => (
                        <button
                            aria-label={date.dateString}
                            disabled={disabled}
                            key={date.dateString}
                            css={dayCell(
                                selectedDate.includes(date.dateString),
                                index,
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
