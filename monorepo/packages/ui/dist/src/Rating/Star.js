"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Star = Star;
var _react = _interopRequireDefault(require("react"));
var _Rating = require("./Rating.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var STAR_PATH = 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';
var STAR_VIEWBOX = '0 0 24 24';
function StarSVG() {
  return (0, _react2.jsx)("svg", {
    viewBox: STAR_VIEWBOX
  }, (0, _react2.jsx)("path", {
    d: STAR_PATH
  }));
}
function Star(_ref) {
  var {
    filled,
    partialFill,
    size,
    customCSS,
    onClick,
    onMouseEnter,
    onMouseLeave
  } = _ref;
  var cssProp = [(0, _Rating.s_size)(size), (0, _Rating.s_star)(filled)];
  return (0, _react2.jsx)("button", {
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    css: [cssProp, customCSS, process.env.NODE_ENV === "production" ? "" : ";label:Star;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SYXRpbmcvU3Rhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNENZIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9SYXRpbmcvU3Rhci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFNlcmlhbGl6ZWRTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBzX2hhbGZTdGFyLCBzX3NpemUsIHNfc3RhciB9IGZyb20gJy4vUmF0aW5nLnN0eWxlJztcblxuZXhwb3J0IHR5cGUgU3RhclNpemUgPSAneHMnIHwgJ3MnIHwgJ21kJyB8ICdsZycgfCAneGwnO1xuY29uc3QgU1RBUl9QQVRIID1cbiAgICAnTTEyIDE3LjI3TDE4LjE4IDIxbC0xLjY0LTcuMDNMMjIgOS4yNGwtNy4xOS0uNjFMMTIgMiA5LjE5IDguNjMgMiA5LjI0bDUuNDYgNC43M0w1LjgyIDIxeic7XG5jb25zdCBTVEFSX1ZJRVdCT1ggPSAnMCAwIDI0IDI0JztcblxuaW50ZXJmYWNlIFN0YXJQcm9wcyB7XG4gICAgZmlsbGVkOiBib29sZWFuO1xuICAgIHBhcnRpYWxGaWxsPzogbnVtYmVyO1xuICAgIHNpemU6IFN0YXJTaXplO1xuICAgIGN1c3RvbUNTUz86IFNlcmlhbGl6ZWRTdHlsZXM7XG4gICAgb25DbGljaz86ICgpID0+IHZvaWQ7XG4gICAgb25Nb3VzZUVudGVyPzogKCkgPT4gdm9pZDtcbiAgICBvbk1vdXNlTGVhdmU/OiAoKSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBTdGFyU1ZHKCkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxzdmcgdmlld0JveD17U1RBUl9WSUVXQk9YfT5cbiAgICAgICAgICAgIDxwYXRoIGQ9e1NUQVJfUEFUSH0gLz5cbiAgICAgICAgPC9zdmc+XG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXIoe1xuICAgIGZpbGxlZCxcbiAgICBwYXJ0aWFsRmlsbCxcbiAgICBzaXplLFxuICAgIGN1c3RvbUNTUyxcbiAgICBvbkNsaWNrLFxuICAgIG9uTW91c2VFbnRlcixcbiAgICBvbk1vdXNlTGVhdmUsXG59OiBTdGFyUHJvcHMpIHtcbiAgICBjb25zdCBjc3NQcm9wID0gW3Nfc2l6ZShzaXplKSwgc19zdGFyKGZpbGxlZCldO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17b25Nb3VzZUVudGVyfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtvbk1vdXNlTGVhdmV9XG4gICAgICAgICAgICBjc3M9e1tjc3NQcm9wLCBjdXN0b21DU1NdfVxuICAgICAgICA+XG4gICAgICAgICAgICA8U3RhclNWRyAvPlxuXG4gICAgICAgICAgICB7cGFydGlhbEZpbGwgJiYgcGFydGlhbEZpbGwgPiAwICYmIHBhcnRpYWxGaWxsIDwgMSA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNzcz17c19oYWxmU3RhcihwYXJ0aWFsRmlsbCAqIDEwMCl9PlxuICAgICAgICAgICAgICAgICAgICA8U3RhclNWRyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICk7XG59XG4iXX0= */"]
  }, (0, _react2.jsx)(StarSVG, null), partialFill && partialFill > 0 && partialFill < 1 ? (0, _react2.jsx)("div", {
    css: (0, _Rating.s_halfStar)(partialFill * 100)
  }, (0, _react2.jsx)(StarSVG, null)) : null);
}