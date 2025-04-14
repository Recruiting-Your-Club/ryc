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

const Calendar = () => {
    // prop destruction
    // lib hooks
    // state, ref, querystring hooks
    const [days, setDays] = useState<{ day: number; isCurrentMonth: boolean }[]>([]);
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDay, setSelectedDay] = useState<number[]>([]);
    // form hooks
    // query hooks
    // calculated values
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    // effects
    useEffect(() => {
        generateCalendarDays();
    }, [currentDate]); // currentDate가 변경될 때마다 이 effect를 실행합니다.

    // handlers
    const handleBackMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };
    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };
    const handleSeletedDate = (selectDate: number) => {
        if (selectedDay?.length === 1) {
            if (selectedDay[0] > selectDate) {
                setSelectedDay([selectDate]);
            } else {
                setSelectedDay([...selectedDay, selectDate]);
            }
        } else {
            setSelectedDay([selectDate]);
        }
    };
    const generateCalendarDays = () => {
        const newDays = []; // days 업데이트를 위한 새 배열

        const daysInMonth = currentDate.daysInMonth(); // 현재 월의 총 일수
        const prevMonth = currentDate.subtract(1, 'month'); // 이전 달
        const firstDayOfMonth = currentDate.day(); // 0(일) ~ 6(토)
        const prevDaysInMonth = prevMonth.daysInMonth(); // 이전 달의 총 일수

        // 저번 달 날짜, i는 저번 달 날짜를 나타낼 횟수, prevDaysInMonth - i는 저번 달 날짜
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            newDays.push({ day: prevDaysInMonth - i, isCurrentMonth: false });
        }

        // 현재 달 날짜
        for (let i = 1; i <= daysInMonth; i++) {
            newDays.push({ day: i, isCurrentMonth: true });
        }

        // 다음 달 날짜
        const remainingDays = 42 - newDays.length; // 7x6 격자
        for (let i = 1; i <= remainingDays; i++) {
            newDays.push({ day: i, isCurrentMonth: false });
        }

        setDays(newDays); // 계산된 새 배열로 상태 업데이트
    };

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
                                selectedDay[0],
                                selectedDay[1],
                                index,
                                data.isCurrentMonth,
                            )}
                            onClick={() => handleSeletedDate(data.day)}
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
