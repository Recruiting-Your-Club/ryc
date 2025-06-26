"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;
var _react = _interopRequireDefault(require("react"));
var _CalendarStyle = require("./CalendarStyle");
var _Text = require("../Text");
var _useCalendar = require("./useCalendar");
var _constants = require("@ssoc/constants");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var Calendar = _ref => {
  var {
    isMultiple = false,
    selectedDate = [],
    onSelect = () => {},
    disabled = false,
    size = 'lg',
    border = false,
    shadow = true,
    zIndex,
    sx = {}
  } = _ref;
  var {
    today,
    days,
    currentDate,
    newSelectedDate,
    handleBackMonth,
    handleNextMonth,
    handleSelectedDate
  } = (0, _useCalendar.useCalendar)(selectedDate, isMultiple, onSelect);
  return (0, _react2.jsx)("div", {
    css: [(0, _CalendarStyle.calendarContainer)({
      size,
      border,
      shadow,
      zIndex
    }), sx, process.env.NODE_ENV === "production" ? "" : ";label:Calendar;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DYWxlbmRhci9DYWxlbmRhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0NhIiwiZmlsZSI6Ii4uLy4uL3NyYy9DYWxlbmRhci9DYWxlbmRhci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgICBjYWxlbmRhckNvbnRhaW5lcixcbiAgICBjYWxlbmRhckJvZHlDb250YWluZXIsXG4gICAgY2FsZW5kYXJIZWFkZXJDb250YWluZXIsXG4gICAgd2Vla2RheXNDb250YWluZXIsXG4gICAgZGF5c0NvbnRhaW5lcixcbiAgICBkYXlDZWxsLFxuICAgIHdlZWtDZWxsLFxuICAgIG1vbnRoQ29udHJvbEJ1dHRvbixcbn0gZnJvbSAnLi9DYWxlbmRhclN0eWxlJztcbmltcG9ydCB7IFRleHQgfSBmcm9tICcuLi9UZXh0JztcbmltcG9ydCB7IHVzZUNhbGVuZGFyIH0gZnJvbSAnLi91c2VDYWxlbmRhcic7XG5pbXBvcnQgdHlwZSB7IENhbGVuZGFyUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFdFRUtEQVlTIH0gZnJvbSAnQHNzb2MvY29uc3RhbnRzJztcblxuY29uc3QgQ2FsZW5kYXIgPSAoe1xuICAgIGlzTXVsdGlwbGUgPSBmYWxzZSxcbiAgICBzZWxlY3RlZERhdGUgPSBbXSxcbiAgICBvblNlbGVjdCA9ICgpID0+IHt9LFxuICAgIGRpc2FibGVkID0gZmFsc2UsXG4gICAgc2l6ZSA9ICdsZycsXG4gICAgYm9yZGVyID0gZmFsc2UsXG4gICAgc2hhZG93ID0gdHJ1ZSxcbiAgICB6SW5kZXgsXG4gICAgc3ggPSB7fSxcbn06IENhbGVuZGFyUHJvcHMpID0+IHtcbiAgICAvLyBwcm9wIGRlc3RydWN0aW9uXG4gICAgY29uc3Qge1xuICAgICAgICB0b2RheSxcbiAgICAgICAgZGF5cyxcbiAgICAgICAgY3VycmVudERhdGUsXG4gICAgICAgIG5ld1NlbGVjdGVkRGF0ZSxcbiAgICAgICAgaGFuZGxlQmFja01vbnRoLFxuICAgICAgICBoYW5kbGVOZXh0TW9udGgsXG4gICAgICAgIGhhbmRsZVNlbGVjdGVkRGF0ZSxcbiAgICB9ID0gdXNlQ2FsZW5kYXIoc2VsZWN0ZWREYXRlLCBpc011bHRpcGxlLCBvblNlbGVjdCk7XG4gICAgLy8gbGliIGhvb2tzXG4gICAgLy8gaW5pdGlhbCB2YWx1ZXNcbiAgICAvLyBzdGF0ZSwgcmVmLCBxdWVyeXN0cmluZyBob29rc1xuICAgIC8vIGZvcm0gaG9va3NcbiAgICAvLyBxdWVyeSBob29rc1xuICAgIC8vIGNhbGN1bGF0ZWQgdmFsdWVzXG4gICAgLy8gaGFuZGxlcnNcbiAgICAvLyBlZmZlY3RzXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17W2NhbGVuZGFyQ29udGFpbmVyKHsgc2l6ZSwgYm9yZGVyLCBzaGFkb3csIHpJbmRleCB9KSwgc3hdfT5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtjYWxlbmRhckhlYWRlckNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVCYWNrTW9udGh9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCLsnbTsoIQg64usXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBjc3M9e21vbnRoQ29udHJvbEJ1dHRvbn1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsnPCd9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPFRleHQgYXM9XCJkaXZcIiB0eXBlPVwiYm9keVNlbWlib2xkXCIgYXJpYS1sYWJlbD17Y3VycmVudERhdGUuZm9ybWF0KCdZWVlZ64WEIE1N7JuUJyl9PlxuICAgICAgICAgICAgICAgICAgICB7Y3VycmVudERhdGUuZm9ybWF0KCdZWVlZ64WEIE1N7JuUJyl9XG4gICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTmV4dE1vbnRofVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwi64uk7J2MIOuLrFwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgY3NzPXttb250aENvbnRyb2xCdXR0b259XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7Jz4nfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtjYWxlbmRhckJvZHlDb250YWluZXJ9PlxuICAgICAgICAgICAgICAgIDxkaXYgY3NzPXt3ZWVrZGF5c0NvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIHtXRUVLREFZUy5tYXAoKGRheSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtkYXl9IGNzcz17d2Vla0NlbGwoaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjc3M9e2RheXNDb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICB7ZGF5cy5tYXAoKGRhdGUpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtkYXRlLmRhdGVTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZGF0ZS5kYXRlU3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17ZGF5Q2VsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0ZWREYXRlLmhhcyhkYXRlLmRhdGVTdHJpbmcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlLndlZWtlbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZGF0ZVN0cmluZyA9PT0gdG9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuaXNDdXJyZW50TW9udGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0ZWREYXRlKGRhdGUuZGF0ZVN0cmluZyl9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RhdGUuZGF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5leHBvcnQgeyBDYWxlbmRhciB9O1xuIl19 */"]
  }, (0, _react2.jsx)("div", {
    css: _CalendarStyle.calendarHeaderContainer
  }, (0, _react2.jsx)("button", {
    onClick: handleBackMonth,
    "aria-label": "\uC774\uC804 \uB2EC",
    disabled: disabled,
    css: _CalendarStyle.monthControlButton
  }, '<'), (0, _react2.jsx)(_Text.Text, {
    as: "div",
    type: "bodySemibold",
    "aria-label": currentDate.format('YYYY년 MM월')
  }, currentDate.format('YYYY년 MM월')), (0, _react2.jsx)("button", {
    onClick: handleNextMonth,
    "aria-label": "\uB2E4\uC74C \uB2EC",
    disabled: disabled,
    css: _CalendarStyle.monthControlButton
  }, '>')), (0, _react2.jsx)("div", {
    css: _CalendarStyle.calendarBodyContainer
  }, (0, _react2.jsx)("div", {
    css: _CalendarStyle.weekdaysContainer
  }, _constants.WEEKDAYS.map((day, index) => (0, _react2.jsx)("div", {
    key: day,
    css: (0, _CalendarStyle.weekCell)(index)
  }, day))), (0, _react2.jsx)("div", {
    css: _CalendarStyle.daysContainer
  }, days.map(date => (0, _react2.jsx)("button", {
    "aria-label": date.dateString,
    disabled: disabled,
    key: date.dateString,
    css: (0, _CalendarStyle.dayCell)(newSelectedDate.has(date.dateString), date.weekend, date.dateString === today, date.isCurrentMonth, disabled),
    onClick: () => handleSelectedDate(date.dateString)
  }, date.day)))));
};
exports.Calendar = Calendar;