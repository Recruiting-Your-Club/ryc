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
import dayjs from 'dayjs';

const Calendar = ({ isMultiple }: { isMultiple: boolean }) => {
    // prop destruction
    // lib hooks
    // initial values
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    // state, ref, querystring hooks
    const [days, setDays] = useState<
        { day: number; isCurrentMonth: boolean; dateString: string }[]
    >([]);
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState<string[]>([]);
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
            setSelectedDate(selectedDate.filter((day) => day !== selectDate));
        } else if (isMultiple) {
            setSelectedDate([...selectedDate, selectDate]);
        } else {
            setSelectedDate([selectDate]);
        }
    };
    const generateCalendarDays = () => {
        const newDays = []; // days 업데이트를 위한 새 배열
        const currentDate = dayjs(); // 현재 날짜
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

        setDays(newDays); // 계산된 새 배열로 상태 업데이트
    };

    // effects
    useEffect(() => {
        generateCalendarDays();
    }, [currentDate]); // currentDate가 변경될 때마다 이 effect를 실행합니다.

    return (
        <div css={calendarContainer}>
            <div css={calendarHeaderContainer}>
                <Button variant="transparent" onClick={handleBackMonth}>
                    {'<'}
                </Button>
                <div>{currentDate.format('YYYY년 MM월')}</div>
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
                    {days.map((data, index) => (
                        <button
                            key={index}
                            css={dayCell(
                                selectedDate.includes(data.dateString),
                                index,
                                data.dateString === currentDate.format('YYYY-MM-DD'),
                                data.isCurrentMonth,
                            )}
                            onClick={() => handleSeletedDate(data.dateString)}
                        >
                            {data.day}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { Calendar };
