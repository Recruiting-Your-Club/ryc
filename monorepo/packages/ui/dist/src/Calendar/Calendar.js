"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;
var _react = _interopRequireDefault(require("react"));
var _constants = require("@ssoc/constants");
var _Text = require("../Text");
var _CalendarStyle = require("./CalendarStyle");
var _useCalendar = require("./useCalendar");
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
    }), sx, process.env.NODE_ENV === "production" ? "" : ";label:Calendar;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DYWxlbmRhci9DYWxlbmRhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaURhIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9DYWxlbmRhci9DYWxlbmRhci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBXRUVLREFZUyB9IGZyb20gJ0Bzc29jL2NvbnN0YW50cyc7XG5cbmltcG9ydCB7IFRleHQgfSBmcm9tICcuLi9UZXh0JztcbmltcG9ydCB7XG4gICAgY2FsZW5kYXJCb2R5Q29udGFpbmVyLFxuICAgIGNhbGVuZGFyQ29udGFpbmVyLFxuICAgIGNhbGVuZGFySGVhZGVyQ29udGFpbmVyLFxuICAgIGRheUNlbGwsXG4gICAgZGF5c0NvbnRhaW5lcixcbiAgICBtb250aENvbnRyb2xCdXR0b24sXG4gICAgd2Vla0NlbGwsXG4gICAgd2Vla2RheXNDb250YWluZXIsXG59IGZyb20gJy4vQ2FsZW5kYXJTdHlsZSc7XG5pbXBvcnQgdHlwZSB7IENhbGVuZGFyUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHVzZUNhbGVuZGFyIH0gZnJvbSAnLi91c2VDYWxlbmRhcic7XG5cbmNvbnN0IENhbGVuZGFyID0gKHtcbiAgICBpc011bHRpcGxlID0gZmFsc2UsXG4gICAgc2VsZWN0ZWREYXRlID0gW10sXG4gICAgb25TZWxlY3QgPSAoKSA9PiB7fSxcbiAgICBkaXNhYmxlZCA9IGZhbHNlLFxuICAgIHNpemUgPSAnbGcnLFxuICAgIGJvcmRlciA9IGZhbHNlLFxuICAgIHNoYWRvdyA9IHRydWUsXG4gICAgekluZGV4LFxuICAgIHN4ID0ge30sXG59OiBDYWxlbmRhclByb3BzKSA9PiB7XG4gICAgLy8gcHJvcCBkZXN0cnVjdGlvblxuICAgIGNvbnN0IHtcbiAgICAgICAgdG9kYXksXG4gICAgICAgIGRheXMsXG4gICAgICAgIGN1cnJlbnREYXRlLFxuICAgICAgICBuZXdTZWxlY3RlZERhdGUsXG4gICAgICAgIGhhbmRsZUJhY2tNb250aCxcbiAgICAgICAgaGFuZGxlTmV4dE1vbnRoLFxuICAgICAgICBoYW5kbGVTZWxlY3RlZERhdGUsXG4gICAgfSA9IHVzZUNhbGVuZGFyKHNlbGVjdGVkRGF0ZSwgaXNNdWx0aXBsZSwgb25TZWxlY3QpO1xuICAgIC8vIGxpYiBob29rc1xuICAgIC8vIGluaXRpYWwgdmFsdWVzXG4gICAgLy8gc3RhdGUsIHJlZiwgcXVlcnlzdHJpbmcgaG9va3NcbiAgICAvLyBmb3JtIGhvb2tzXG4gICAgLy8gcXVlcnkgaG9va3NcbiAgICAvLyBjYWxjdWxhdGVkIHZhbHVlc1xuICAgIC8vIGhhbmRsZXJzXG4gICAgLy8gZWZmZWN0c1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e1tjYWxlbmRhckNvbnRhaW5lcih7IHNpemUsIGJvcmRlciwgc2hhZG93LCB6SW5kZXggfSksIHN4XX0+XG4gICAgICAgICAgICA8ZGl2IGNzcz17Y2FsZW5kYXJIZWFkZXJDb250YWluZXJ9PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQmFja01vbnRofVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwi7J207KCEIOuLrFwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgY3NzPXttb250aENvbnRyb2xCdXR0b259XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7JzwnfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxUZXh0IGFzPVwiZGl2XCIgdHlwZT1cImJvZHlTZW1pYm9sZFwiIGFyaWEtbGFiZWw9e2N1cnJlbnREYXRlLmZvcm1hdCgnWVlZWeuFhCBNTeyblCcpfT5cbiAgICAgICAgICAgICAgICAgICAge2N1cnJlbnREYXRlLmZvcm1hdCgnWVlZWeuFhCBNTeyblCcpfVxuICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU5leHRNb250aH1cbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIuuLpOydjCDri6xcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgIGNzcz17bW9udGhDb250cm9sQnV0dG9ufVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyc+J31cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNzcz17Y2FsZW5kYXJCb2R5Q29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNzcz17d2Vla2RheXNDb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICB7V0VFS0RBWVMubWFwKChkYXksIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZGF5fSBjc3M9e3dlZWtDZWxsKGluZGV4KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RheX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtkYXlzQ29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAge2RheXMubWFwKChkYXRlKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17ZGF0ZS5kYXRlU3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2RhdGUuZGF0ZVN0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e2RheUNlbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NlbGVjdGVkRGF0ZS5oYXMoZGF0ZS5kYXRlU3RyaW5nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS53ZWVrZW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlLmRhdGVTdHJpbmcgPT09IHRvZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlLmlzQ3VycmVudE1vbnRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdGVkRGF0ZShkYXRlLmRhdGVTdHJpbmcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlLmRheX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IHsgQ2FsZW5kYXIgfTtcbiJdfQ== */"]
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