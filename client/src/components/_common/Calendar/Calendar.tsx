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
import type { CalendarProps } from './types';
import type { CalendarData } from './types';

const Calendar = ({
    isMultiple = false,
    selectedDate = [],
    onSelect = () => {},
    disabled = false,
    size = 'lg',
    border = false,
    shadow = true,
    sx = {},
}: CalendarProps) => {
    // prop destruction
    // lib hooks
    // initial values
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const today = dayjs().format('YYYY-MM-DD');

    // state, ref, querystring hooks
    const [days, setDays] = useState<CalendarData[]>([]);
    const [currentDate, setCurrentDate] = useState(dayjs());

    // form hooks
    // query hooks
    // calculated values

    // handlers
    const handleBackMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };
    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };
    const handleSeletedDate = (selectDate: string) => {
        if (selectedDate.includes(selectDate)) {
            onSelect(selectedDate.filter((day) => day !== selectDate));
        } else if (isMultiple) {
            onSelect([...selectedDate, selectDate]);
        } else {
            onSelect([selectDate]);
        }
    };
    const generateCalendarDays = () => {
        const newDays = []; // days 업데이트를 위한 새 배열
        const daysInMonth = currentDate.daysInMonth(); // 현재 월의 총 일수
        const prevMonth = currentDate.subtract(1, 'month'); // 이전 달
        const firstDayOfMonth = currentDate.day(); // 0(일) ~ 6(토)
        const prevDaysInMonth = prevMonth.daysInMonth(); // 이전 달의 총 일수

        // 저번 달 날짜
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const date = prevMonth.date(prevDaysInMonth - i);
            newDays.push({
                day: prevDaysInMonth - i,
                isCurrentMonth: false,
                dateString: date.format('YYYY-MM-DD'),
            });
        }

        // 현재 달 날짜
        for (let i = 1; i <= daysInMonth; i++) {
            const date = currentDate.date(i);
            newDays.push({
                day: i,
                isCurrentMonth: true,
                dateString: date.format('YYYY-MM-DD'),
            });
        }

        // 다음 달 날짜
        const nextMonth = currentDate.add(1, 'month');
        const remainingDays = 42 - newDays.length; // 7x6 격자
        for (let i = 1; i <= remainingDays; i++) {
            const date = nextMonth.date(i);
            newDays.push({
                day: i,
                isCurrentMonth: false,
                dateString: date.format('YYYY-MM-DD'),
            });
        }

        setDays(newDays);
    };

    // effects
    useEffect(() => {
        generateCalendarDays();
    }, [currentDate]);

    return (
        <div css={[calendarContainer({ size, border, shadow }), sx]}>
            <div css={calendarHeaderContainer}>
                <Button variant="transparent" onClick={handleBackMonth}>
                    {'<'}
                </Button>
                <Text as="div" type="bodySemibold">
                    {currentDate.format('YYYY년 MM월')}
                </Text>
                <Button variant="transparent" onClick={handleNextMonth}>
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
                            disabled={disabled}
                            key={index}
                            css={dayCell(
                                selectedDate.includes(date.dateString),
                                index,
                                date.dateString === today,
                                date.isCurrentMonth,
                                disabled,
                            )}
                            onClick={() => handleSeletedDate(date.dateString)}
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
