import React from 'react';
import {
    calendarContainer,
    calendarBodyContainer,
    calendarHeaderContainer,
    weekdaysContainer,
    daysContainer,
    dayCell,
    weekCell,
    monthControlButton,
} from './CalendarStyle';
import { Text } from '@components';
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
    rangePicker = false,
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
        handleRangeSelect,
    } = useCalendar(selectedDate, isMultiple, onSelect);
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleDateRangePicker = (selectDate: string) => {
        if (rangePicker) {
            handleRangeSelect(selectDate);
        } else {
            handleSelectedDate(selectDate);
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

                <div css={daysContainer(rangePicker)}>
                    {days.map((date) => (
                        <button
                            aria-label={date.dateString}
                            disabled={disabled}
                            key={date.dateString}
                            css={dayCell(
                                selectedDate,
                                date,
                                date.dateString === today,
                                newSelectedDate.has(date.dateString),
                                disabled,
                                rangePicker,
                            )}
                            onClick={() => handleDateRangePicker(date.dateString)}
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
