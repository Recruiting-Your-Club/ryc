"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardRoot = CardRoot;
var _react = _interopRequireDefault(require("react"));
var _Card = require("./Card.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CardRoot(_ref) {
  var {
    width = '35rem',
    radius = '0.3125rem',
    hover = false,
    customCss,
    children,
    onClick,
    onClickHandler
  } = _ref;
  return (0, _react2.jsx)("div", {
    onClick: onClick,
    onKeyDown: onClickHandler,
    css: [(0, _Card.baseCard)(width, radius, hover), customCss, process.env.NODE_ENV === "production" ? "" : ";label:CardRoot;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DYXJkL0NhcmRSb290LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQ1kiLCJmaWxlIjoiLi4vLi4vc3JjL0NhcmQvQ2FyZFJvb3QudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGJhc2VDYXJkIH0gZnJvbSAnLi9DYXJkLnN0eWxlJztcblxuaW50ZXJmYWNlIENhcmRSb290UHJvcHMge1xuICAgIHdpZHRoPzogc3RyaW5nO1xuICAgIHJhZGl1cz86IHN0cmluZztcbiAgICBob3Zlcj86IGJvb2xlYW47XG4gICAgY3VzdG9tQ3NzPzogU2VyaWFsaXplZFN0eWxlcztcbiAgICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbiAgICBvbkNsaWNrSGFuZGxlcj86ICgpID0+IHZvaWQ7XG59XG5cbmZ1bmN0aW9uIENhcmRSb290KHtcbiAgICB3aWR0aCA9ICczNXJlbScsXG4gICAgcmFkaXVzID0gJzAuMzEyNXJlbScsXG4gICAgaG92ZXIgPSBmYWxzZSxcbiAgICBjdXN0b21Dc3MsXG4gICAgY2hpbGRyZW4sXG4gICAgb25DbGljayxcbiAgICBvbkNsaWNrSGFuZGxlcixcbn06IENhcmRSb290UHJvcHMpIHtcbiAgICAvLyBwcm9wIGRlc3RydWN0aW9uXG4gICAgLy8gbGliIGhvb2tzXG4gICAgLy8gc3RhdGUsIHJlZiwgcXVlcnlzdHJpbmcgaG9va3NcbiAgICAvLyBmb3JtIGhvb2tzXG4gICAgLy8gcXVlcnkgaG9va3NcbiAgICAvLyBjYWxjdWxhdGVkIHZhbHVlc1xuICAgIC8vIGVmZmVjdHNcbiAgICAvLyBoYW5kbGVyc1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICAgIG9uS2V5RG93bj17b25DbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICBjc3M9e1tiYXNlQ2FyZCh3aWR0aCwgcmFkaXVzLCBob3ZlciksIGN1c3RvbUNzc119XG4gICAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICA+XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCB7IENhcmRSb290IH07XG4iXX0= */"],
    tabIndex: 0,
    role: "button"
  }, children);
}