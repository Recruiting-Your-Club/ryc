import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { calendarContainer, calendarBodyContainer, calendarHeaderContainer, weekdaysContainer, daysContainer, dayCell, weekCell, monthControlButton, } from './CalendarStyle';
import { Text } from '@components';
import { useCalendar } from './useCalendar';
import { WEEKDAYS } from '@constants/calendar';
const Calendar = ({ isMultiple = false, selectedDate = [], onSelect = () => { }, disabled = false, size = 'lg', border = false, shadow = true, zIndex, sx = {}, }) => {
    const { today, days, currentDate, newSelectedDate, handleBackMonth, handleNextMonth, handleSelectedDate, } = useCalendar(selectedDate, isMultiple, onSelect);
    return (_jsxs("div", { css: [calendarContainer({ size, border, shadow, zIndex }), sx], children: [_jsxs("div", { css: calendarHeaderContainer, children: [_jsx("button", { onClick: handleBackMonth, "aria-label": "\uC774\uC804 \uB2EC", disabled: disabled, css: monthControlButton, children: '<' }), _jsx(Text, { as: "div", type: "bodySemibold", "aria-label": currentDate.format('YYYY년 MM월'), children: currentDate.format('YYYY년 MM월') }), _jsx("button", { onClick: handleNextMonth, "aria-label": "\uB2E4\uC74C \uB2EC", disabled: disabled, css: monthControlButton, children: '>' })] }), _jsxs("div", { css: calendarBodyContainer, children: [_jsx("div", { css: weekdaysContainer, children: WEEKDAYS.map((day, index) => (_jsx("div", { css: weekCell(index), children: day }, day))) }), _jsx("div", { css: daysContainer, children: days.map((date) => (_jsx("button", { "aria-label": date.dateString, disabled: disabled, css: dayCell(newSelectedDate.has(date.dateString), date.weekend, date.dateString === today, date.isCurrentMonth, disabled), onClick: () => handleSelectedDate(date.dateString), children: date.day }, date.dateString))) })] })] }));
};
export { Calendar };
//# sourceMappingURL=Calendar.js.map