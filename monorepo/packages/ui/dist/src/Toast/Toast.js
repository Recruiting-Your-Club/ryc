"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = Toast;
var _react = _interopRequireDefault(require("react"));
var _alertFilled = _interopRequireDefault(require("@ssoc/assets/images/alert-filled.svg"));
var _alert = _interopRequireDefault(require("@ssoc/assets/images/alert.svg"));
var _checkFilled = _interopRequireDefault(require("@ssoc/assets/images/check-filled.svg"));
var _check = _interopRequireDefault(require("@ssoc/assets/images/check.svg"));
var _Toast = require("./Toast.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Toast(_ref) {
  var {
    type = 'default',
    toastTheme = 'white',
    status = 'entering',
    duration = 3000,
    autoClose = true,
    progressBar = true,
    content,
    sx
  } = _ref;
  return (0, _react2.jsx)("div", {
    css: [(0, _Toast.toastStyle)(status, toastTheme, type), sx, process.env.NODE_ENV === "production" ? "" : ";label:Toast;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Ub2FzdC9Ub2FzdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUJhIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9Ub2FzdC9Ub2FzdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQWxlcnRGaWxsZWQgZnJvbSAnQHNzb2MvYXNzZXRzL2ltYWdlcy9hbGVydC1maWxsZWQuc3ZnJztcbmltcG9ydCBBbGVydCBmcm9tICdAc3NvYy9hc3NldHMvaW1hZ2VzL2FsZXJ0LnN2Zyc7XG5pbXBvcnQgQ2hlY2tGaWxsZWQgZnJvbSAnQHNzb2MvYXNzZXRzL2ltYWdlcy9jaGVjay1maWxsZWQuc3ZnJztcbmltcG9ydCBDaGVjayBmcm9tICdAc3NvYy9hc3NldHMvaW1hZ2VzL2NoZWNrLnN2Zyc7XG5cbmltcG9ydCB7IHByb2dyZXNzQmFyU3R5bGUsIHN2Z1N0eWxlLCB0b2FzdFN0eWxlIH0gZnJvbSAnLi9Ub2FzdC5zdHlsZSc7XG5pbXBvcnQgdHlwZSB7IFRvYXN0UHJvcHMsIFRvYXN0VGhlbWUsIFR5cGUgfSBmcm9tICcuL3R5cGUnO1xuXG5mdW5jdGlvbiBUb2FzdCh7XG4gICAgdHlwZSA9ICdkZWZhdWx0JyxcbiAgICB0b2FzdFRoZW1lID0gJ3doaXRlJyxcbiAgICBzdGF0dXMgPSAnZW50ZXJpbmcnLFxuICAgIGR1cmF0aW9uID0gMzAwMCxcbiAgICBhdXRvQ2xvc2UgPSB0cnVlLFxuICAgIHByb2dyZXNzQmFyID0gdHJ1ZSxcbiAgICBjb250ZW50LFxuICAgIHN4LFxufTogVG9hc3RQcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY3NzPXtbdG9hc3RTdHlsZShzdGF0dXMsIHRvYXN0VGhlbWUsIHR5cGUpLCBzeF19PlxuICAgICAgICAgICAge3R5cGUgIT09ICdkZWZhdWx0JyAmJiBnZXRTVkcodHlwZSwgdG9hc3RUaGVtZSl9XG4gICAgICAgICAgICB7YXV0b0Nsb3NlICYmIHByb2dyZXNzQmFyICYmIDxkaXYgY3NzPXtwcm9ncmVzc0JhclN0eWxlKHRvYXN0VGhlbWUsIHR5cGUsIGR1cmF0aW9uKX0gLz59XG4gICAgICAgICAgICA8ZGl2Pntjb250ZW50fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5jb25zdCBpY29uTWFwID0ge1xuICAgIGluZm86IHsgb3V0bGluZTogQWxlcnQsIGZpbGxlZDogQWxlcnRGaWxsZWQgfSxcbiAgICBzdWNjZXNzOiB7IG91dGxpbmU6IENoZWNrLCBmaWxsZWQ6IENoZWNrRmlsbGVkIH0sXG4gICAgZXJyb3I6IHsgb3V0bGluZTogQWxlcnQsIGZpbGxlZDogQWxlcnRGaWxsZWQgfSxcbiAgICBkZWZhdWx0OiBudWxsLFxufTtcbmZ1bmN0aW9uIGdldFNWRyh0eXBlOiBUeXBlLCB0b2FzdFRoZW1lOiBUb2FzdFRoZW1lKSB7XG4gICAgY29uc3QgSWNvbiA9XG4gICAgICAgIGljb25NYXBbdHlwZSA9PT0gJ2RlZmF1bHQnID8gJ2luZm8nIDogdHlwZV1bXG4gICAgICAgICAgICB0b2FzdFRoZW1lID09PSAnY29sb3JlZCcgPyAnZmlsbGVkJyA6ICdvdXRsaW5lJ1xuICAgICAgICBdO1xuICAgIHJldHVybiA8SWNvbiBjc3M9e3N2Z1N0eWxlKHR5cGUpfSAvPjtcbn1cbmV4cG9ydCB7IFRvYXN0IH07XG4iXX0= */"]
  }, type !== 'default' && getSVG(type, toastTheme), autoClose && progressBar && (0, _react2.jsx)("div", {
    css: (0, _Toast.progressBarStyle)(toastTheme, type, duration)
  }), (0, _react2.jsx)("div", null, content));
}
var iconMap = {
  info: {
    outline: _alert.default,
    filled: _alertFilled.default
  },
  success: {
    outline: _check.default,
    filled: _checkFilled.default
  },
  error: {
    outline: _alert.default,
    filled: _alertFilled.default
  },
  default: null
};
function getSVG(type, toastTheme) {
  var Icon = iconMap[type === 'default' ? 'info' : type][toastTheme === 'colored' ? 'filled' : 'outline'];
  return (0, _react2.jsx)(Icon, {
    css: (0, _Toast.svgStyle)(type)
  });
}