import React, { useState } from 'react';

import { WEEKDAYS } from '../../constants/calendar';
import { Text } from '../Text';
import {
    calendarBodyContainer,
    calendarContainer,
    calendarHeaderContainer,
    dayCell,
    daysContainer,
    monthControlButton,
    weekdaysContainer,
    weekendColor,
} from './Calendar.style';
import type { CalendarMode, CalendarProps } from './types';
import { useCalendar } from './utils';

function Calendar({
    mode = 'single',
    selectedDate = [],
    highlightedDate = [],
    onSelect = () => {},
    onlySelected = false,
    disabled = false,
    size = 'lg',
    border = false,
    shadow = true,
    zIndex,
    sx = {},
}: CalendarProps) {
    // prop destruction
    const {
        days,
        currentDate,
        handleBackMonth,
        handleNextMonth,
        handleSingleSelect,
        handleMultipleSelect,
        handleRangeSelect,
        handleCustomSelect,
        isSelected,
        isToday,
        isDisabled,
    } = useCalendar(selectedDate, onSelect);
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const getCalendarMode: Record<CalendarMode, (selectDate: string) => void> = {
        single: handleSingleSelect,
        multiple: handleMultipleSelect,
        range: handleRangeSelect,
        custom: handleCustomSelect,
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
                        <div key={day} css={weekendColor(index)}>
                            {day}
                        </div>
                    ))}
                </div>

                <div css={daysContainer(mode, disabled)}>
                    {days.map((date) => (
                        <button
                            aria-label={date.dateString}
                            disabled={disabled || isDisabled(date.dateString, onlySelected)}
                            key={date.dateString}
                            css={dayCell(
                                selectedDate,
                                date,
                                isToday(date.dateString),
                                isSelected(date.dateString),
                                onlySelected,
                                mode,
                                highlightedDate,
                            )}
                            onClick={() => getCalendarMode[mode](date.dateString)}
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
