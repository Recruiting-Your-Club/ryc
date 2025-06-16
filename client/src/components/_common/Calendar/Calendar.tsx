import React, { useState } from 'react';
import {
    calendarContainer,
    calendarBodyContainer,
    calendarHeaderContainer,
    weekdaysContainer,
    daysContainer,
    dayCell,
    weekCell,
    monthControlButton,
} from './Calendar.style';
import { Text } from '@components';
import { useCalendar } from './utils';
import type { CalendarProps } from './types';
import { WEEKDAYS } from '@constants/calendar';

function Calendar({
    mode = 'single',
    selectedDate = [],
    onSelect = () => {},
    disabled = false,
    size = 'lg',
    border = false,
    shadow = true,
    zIndex,
    sx = {},
}: CalendarProps) {
    // prop destruction
    const {
        today,
        days,
        currentDate,
        handleBackMonth,
        handleNextMonth,
        handleSingleSelect,
        handleMultipleSelect,
        handleRangeSelect,
    } = useCalendar(selectedDate, onSelect);
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleCalendarType = (selectDate: string) => {
        switch (mode) {
            case 'single':
                handleSingleSelect(selectDate);
                break;
            case 'multiple':
                handleMultipleSelect(selectDate);
                break;
            case 'range':
                handleRangeSelect(selectDate);
                break;
        }
    };
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

                <div css={daysContainer(mode)}>
                    {days.map((date) => (
                        <button
                            aria-label={date.dateString}
                            disabled={disabled}
                            key={date.dateString}
                            css={dayCell(
                                selectedDate,
                                date,
                                date.dateString === today,
                                selectedDate.includes(date.dateString),
                                disabled,
                                mode,
                            )}
                            onClick={() => handleCalendarType(date.dateString)}
                        >
                            {date.day}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { Calendar };
