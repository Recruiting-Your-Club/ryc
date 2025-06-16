import React, { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import type { CalendarData } from './types';
import { CALENDAR_SIZE } from '@constants/calendar';

function useCalendar(selectedDate: string[] = [], onSelect: (selectedDate: string[]) => void) {
    // prop destruction
    // lib hooks
    // initial values
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

    const handleSingleSelect = useCallback(
        (newDate: string) => {
            onSelect([newDate]);
        },
        [onSelect],
    );

    const handleMultipleSelect = useCallback(
        (newDate: string) => {
            const isAlreadySelected = selectedDate.includes(newDate);
            if (isAlreadySelected) {
                const updatedDates = selectedDate.filter((date) => date !== newDate);
                onSelect(updatedDates);
            } else {
                const updatedDates = [...selectedDate, newDate];
                onSelect(updatedDates);
            }
        },
        [selectedDate, onSelect],
    );

    const handleRangeSelect = useCallback(
        (newDate: string) => {
            if (selectedDate.length === 2) {
                onSelect([newDate]);
            } else if (selectedDate.length === 1) {
                if (selectedDate[0] < newDate) {
                    onSelect([selectedDate[0], newDate]);
                } else {
                    onSelect([newDate]);
                }
            } else {
                onSelect([newDate]);
            }
        },
        [selectedDate, onSelect],
    );

    const generateCalendarDays = () => {
        const newDays = []; // days 업데이트를 위한 새 배열
        const daysInMonth = currentDate.daysInMonth(); // 현재 월의 총 일수
        const prevMonth = currentDate.subtract(1, 'month'); // 이전 달
        const firstDayOfMonth = currentDate.startOf('month').day(); // 0(일) ~ 6(토)
        const prevDaysInMonth = prevMonth.daysInMonth(); // 이전 달의 총 일수

        // 저번 달 날짜
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const date = prevMonth.date(prevDaysInMonth - i);
            newDays.push({
                day: prevDaysInMonth - i,
                isCurrentMonth: false,
                dateString: date.format('YYYY-MM-DD'),
                weekend: date.day(),
            });
        }

        // 현재 달 날짜
        for (let i = 1; i <= daysInMonth; i++) {
            const date = currentDate.date(i);
            newDays.push({
                day: i,
                isCurrentMonth: true,
                dateString: date.format('YYYY-MM-DD'),
                weekend: date.day(),
            });
        }

        // 다음 달 날짜
        const nextMonth = currentDate.add(1, 'month');
        const remainingDays = CALENDAR_SIZE - newDays.length; // 7x6 격자
        for (let i = 1; i <= remainingDays; i++) {
            const date = nextMonth.date(i);
            newDays.push({
                day: i,
                isCurrentMonth: false,
                dateString: date.format('YYYY-MM-DD'),
                weekend: date.day(),
            });
        }

        setDays(newDays);
    };

    // effects
    useEffect(() => {
        generateCalendarDays();
    }, [currentDate]);

    return {
        currentDate,
        days,
        today,
        newSelectedDate,
        handleBackMonth,
        handleNextMonth,
        handleRangeSelect,
        handleSingleSelect,
        handleMultipleSelect,
    };
}
export { useCalendar };
