"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCalendar = useCalendar;
var _react = require("react");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _constants = require("@ssoc/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function useCalendar() {
  var selectedDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var isMultiple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var onSelect = arguments.length > 2 ? arguments[2] : undefined;
  var today = (0, _dayjs.default)().format('YYYY-MM-DD');
  var newSelectedDate = new Set(selectedDate);
  var [days, setDays] = (0, _react.useState)([]);
  var [currentDate, setCurrentDate] = (0, _react.useState)((0, _dayjs.default)());
  var handleBackMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };
  var handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };
  var handleSelectedDate = (0, _react.useCallback)(selectDate => {
    var newSelectedDate = new Set(selectedDate);
    if (newSelectedDate.has(selectDate)) {
      newSelectedDate.delete(selectDate);
      onSelect([...newSelectedDate]);
    } else if (isMultiple) {
      newSelectedDate.add(selectDate);
      onSelect([...newSelectedDate]);
    } else {
      onSelect([selectDate]);
    }
  }, [selectedDate, onSelect, isMultiple]);
  var generateCalendarDays = () => {
    var newDays = [];
    var daysInMonth = currentDate.daysInMonth();
    var prevMonth = currentDate.subtract(1, 'month');
    var firstDayOfMonth = currentDate.startOf('month').day();
    var prevDaysInMonth = prevMonth.daysInMonth();
    for (var i = firstDayOfMonth - 1; i >= 0; i--) {
      var date = prevMonth.date(prevDaysInMonth - i);
      newDays.push({
        day: prevDaysInMonth - i,
        isCurrentMonth: false,
        dateString: date.format('YYYY-MM-DD'),
        weekend: date.day()
      });
    }
    for (var _i = 1; _i <= daysInMonth; _i++) {
      var _date = currentDate.date(_i);
      newDays.push({
        day: _i,
        isCurrentMonth: true,
        dateString: _date.format('YYYY-MM-DD'),
        weekend: _date.day()
      });
    }
    var nextMonth = currentDate.add(1, 'month');
    var remainingDays = _constants.CALENDAR_SIZE - newDays.length;
    for (var _i2 = 1; _i2 <= remainingDays; _i2++) {
      var _date2 = nextMonth.date(_i2);
      newDays.push({
        day: _i2,
        isCurrentMonth: false,
        dateString: _date2.format('YYYY-MM-DD'),
        weekend: _date2.day()
      });
    }
    setDays(newDays);
  };
  (0, _react.useEffect)(() => {
    generateCalendarDays();
  }, [currentDate]);
  return {
    currentDate,
    days,
    today,
    newSelectedDate,
    handleBackMonth,
    handleNextMonth,
    handleSelectedDate
  };
}