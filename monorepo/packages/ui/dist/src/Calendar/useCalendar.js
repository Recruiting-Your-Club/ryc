import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import { CALENDAR_SIZE } from '@constants/calendar';
function useCalendar(selectedDate = [], isMultiple = false, onSelect) {
    const today = dayjs().format('YYYY-MM-DD');
    const newSelectedDate = new Set(selectedDate);
    const [days, setDays] = useState([]);
    const [currentDate, setCurrentDate] = useState(dayjs());
    const handleBackMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };
    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };
    const handleSelectedDate = useCallback((selectDate) => {
        const newSelectedDate = new Set(selectedDate);
        if (newSelectedDate.has(selectDate)) {
            newSelectedDate.delete(selectDate);
            onSelect([...newSelectedDate]);
        }
        else if (isMultiple) {
            newSelectedDate.add(selectDate);
            onSelect([...newSelectedDate]);
        }
        else {
            onSelect([selectDate]);
        }
    }, [selectedDate, onSelect, isMultiple]);
    const generateCalendarDays = () => {
        const newDays = [];
        const daysInMonth = currentDate.daysInMonth();
        const prevMonth = currentDate.subtract(1, 'month');
        const firstDayOfMonth = currentDate.startOf('month').day();
        const prevDaysInMonth = prevMonth.daysInMonth();
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const date = prevMonth.date(prevDaysInMonth - i);
            newDays.push({
                day: prevDaysInMonth - i,
                isCurrentMonth: false,
                dateString: date.format('YYYY-MM-DD'),
                weekend: date.day(),
            });
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const date = currentDate.date(i);
            newDays.push({
                day: i,
                isCurrentMonth: true,
                dateString: date.format('YYYY-MM-DD'),
                weekend: date.day(),
            });
        }
        const nextMonth = currentDate.add(1, 'month');
        const remainingDays = CALENDAR_SIZE - newDays.length;
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
        handleSelectedDate,
    };
}
export { useCalendar };
//# sourceMappingURL=useCalendar.js.map