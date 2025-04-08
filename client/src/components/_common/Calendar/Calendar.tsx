import React, { useState } from 'react';
import { css } from '@emotion/react';
import {
    calendarContainer,
    calendarBodyContainer,
    calendarHeaderContainer,
    weekdaysContainer,
    daysContainer,
    dayCell,
    weekCell,
} from './CalendarStyle';
import { Button } from '@components'; // 기존 Button 컴포넌트 사용 가정

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    // 월 이름 (한글)
    const months = [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
    ];

    // 요일 이름 (한글)
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    const days = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        26, 27, 28,
    ];
    return (
        <div css={calendarContainer}>
            <div css={calendarHeaderContainer}>
                <Button variant="transparent">이전</Button>
                <div>
                    {currentDate.getFullYear()}년 {months[currentDate.getMonth()]}
                </div>
                <Button variant="transparent">다음</Button>
            </div>

            <div css={calendarBodyContainer}>
                <div css={weekdaysContainer}>
                    {weekdays.map((day, index) => (
                        <div key={index} css={weekCell(index)}>
                            {day}
                        </div>
                    ))}
                </div>

                <div css={daysContainer}>
                    {days.map((day, index) => (
                        <button key={index} css={dayCell(index)}>
                            {day}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { Calendar };
