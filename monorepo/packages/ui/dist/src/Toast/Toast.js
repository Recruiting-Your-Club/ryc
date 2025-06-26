"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = Toast;
var _react = _interopRequireDefault(require("react"));
var _Toast = require("./Toast.style");
var _alert = _interopRequireDefault(require("@ssoc/assets/images/alert.svg"));
var _check = _interopRequireDefault(require("@ssoc/assets/images/check.svg"));
var _checkFilled = _interopRequireDefault(require("@ssoc/assets/images/check-filled.svg"));
var _alertFilled = _interopRequireDefault(require("@ssoc/assets/images/alert-filled.svg"));
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
    css: [(0, _Toast.toastStyle)(status, toastTheme, type), sx, process.env.NODE_ENV === "production" ? "" : ";label:Toast;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Ub2FzdC9Ub2FzdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJhIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9Ub2FzdC9Ub2FzdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBUeXBlLCBUb2FzdFByb3BzLCBUb2FzdFRoZW1lIH0gZnJvbSAnLi90eXBlJztcbmltcG9ydCB7IHRvYXN0U3R5bGUsIHN2Z1N0eWxlLCBwcm9ncmVzc0JhclN0eWxlIH0gZnJvbSAnLi9Ub2FzdC5zdHlsZSc7XG5pbXBvcnQgQWxlcnQgZnJvbSAnQHNzb2MvYXNzZXRzL2ltYWdlcy9hbGVydC5zdmcnO1xuaW1wb3J0IENoZWNrIGZyb20gJ0Bzc29jL2Fzc2V0cy9pbWFnZXMvY2hlY2suc3ZnJztcbmltcG9ydCBDaGVja0ZpbGxlZCBmcm9tICdAc3NvYy9hc3NldHMvaW1hZ2VzL2NoZWNrLWZpbGxlZC5zdmcnO1xuaW1wb3J0IEFsZXJ0RmlsbGVkIGZyb20gJ0Bzc29jL2Fzc2V0cy9pbWFnZXMvYWxlcnQtZmlsbGVkLnN2Zyc7XG5cbmZ1bmN0aW9uIFRvYXN0KHtcbiAgICB0eXBlID0gJ2RlZmF1bHQnLFxuICAgIHRvYXN0VGhlbWUgPSAnd2hpdGUnLFxuICAgIHN0YXR1cyA9ICdlbnRlcmluZycsXG4gICAgZHVyYXRpb24gPSAzMDAwLFxuICAgIGF1dG9DbG9zZSA9IHRydWUsXG4gICAgcHJvZ3Jlc3NCYXIgPSB0cnVlLFxuICAgIGNvbnRlbnQsXG4gICAgc3gsXG59OiBUb2FzdFByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e1t0b2FzdFN0eWxlKHN0YXR1cywgdG9hc3RUaGVtZSwgdHlwZSksIHN4XX0+XG4gICAgICAgICAgICB7dHlwZSAhPT0gJ2RlZmF1bHQnICYmIGdldFNWRyh0eXBlLCB0b2FzdFRoZW1lKX1cbiAgICAgICAgICAgIHthdXRvQ2xvc2UgJiYgcHJvZ3Jlc3NCYXIgJiYgPGRpdiBjc3M9e3Byb2dyZXNzQmFyU3R5bGUodG9hc3RUaGVtZSwgdHlwZSwgZHVyYXRpb24pfSAvPn1cbiAgICAgICAgICAgIDxkaXY+e2NvbnRlbnR9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmNvbnN0IGljb25NYXAgPSB7XG4gICAgaW5mbzogeyBvdXRsaW5lOiBBbGVydCwgZmlsbGVkOiBBbGVydEZpbGxlZCB9LFxuICAgIHN1Y2Nlc3M6IHsgb3V0bGluZTogQ2hlY2ssIGZpbGxlZDogQ2hlY2tGaWxsZWQgfSxcbiAgICBlcnJvcjogeyBvdXRsaW5lOiBBbGVydCwgZmlsbGVkOiBBbGVydEZpbGxlZCB9LFxuICAgIGRlZmF1bHQ6IG51bGwsXG59O1xuZnVuY3Rpb24gZ2V0U1ZHKHR5cGU6IFR5cGUsIHRvYXN0VGhlbWU6IFRvYXN0VGhlbWUpIHtcbiAgICBjb25zdCBJY29uID0gaWNvbk1hcFt0eXBlID09PSAnZGVmYXVsdCcgPyAnaW5mbycgOiB0eXBlXVt0b2FzdFRoZW1lID09PSAnY29sb3JlZCcgPyAnZmlsbGVkJyA6ICdvdXRsaW5lJ107XG4gICAgcmV0dXJuIDxJY29uIGNzcz17c3ZnU3R5bGUodHlwZSl9IC8+O1xufVxuZXhwb3J0IHsgVG9hc3QgfTtcbiJdfQ== */"]
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