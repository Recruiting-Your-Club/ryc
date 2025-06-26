"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectValue = SelectValue;
var _react = _interopRequireDefault(require("react"));
var _Select = require("./Select.styles");
var _SelectContext = require("./SelectContext");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SelectValue(_ref) {
  var {
    placeholder,
    sx
  } = _ref;
  var {
    value,
    label
  } = (0, _SelectContext.useSelectContext)();
  return (0, _react2.jsx)("span", {
    css: [_Select.s_selectValue, sx, process.env.NODE_ENV === "production" ? "" : ";label:SelectValue;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0VmFsdWUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCYyIsImZpbGUiOiIuLi8uLi8uLi9zcmMvU2VsZWN0L1NlbGVjdFZhbHVlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ1NTT2JqZWN0IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgc19zZWxlY3RQbGFjZWhvbGRlciwgc19zZWxlY3RWYWx1ZSB9IGZyb20gJy4vU2VsZWN0LnN0eWxlcyc7XG5pbXBvcnQgeyB1c2VTZWxlY3RDb250ZXh0IH0gZnJvbSAnLi9TZWxlY3RDb250ZXh0JztcblxuLyoqXG4gKiBTZWxlY3RWYWx1ZSDsu7Ttj6zrhIztirhcbiAqL1xuaW50ZXJmYWNlIFNlbGVjdFZhbHVlUHJvcHMge1xuICAgIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIHN4PzogQ1NTT2JqZWN0O1xufVxuXG5mdW5jdGlvbiBTZWxlY3RWYWx1ZSh7IHBsYWNlaG9sZGVyLCBzeCB9OiBTZWxlY3RWYWx1ZVByb3BzKSB7XG4gICAgY29uc3QgeyB2YWx1ZSwgbGFiZWwgfSA9IHVzZVNlbGVjdENvbnRleHQoKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxzcGFuIGNzcz17W3Nfc2VsZWN0VmFsdWUsIHN4XX0+XG4gICAgICAgICAgICB7dmFsdWUgPyBsYWJlbCA6IHBsYWNlaG9sZGVyICYmIDxzcGFuIGNzcz17c19zZWxlY3RQbGFjZWhvbGRlcn0+e3BsYWNlaG9sZGVyfTwvc3Bhbj59XG4gICAgICAgIDwvc3Bhbj5cbiAgICApO1xufVxuXG5leHBvcnQgeyBTZWxlY3RWYWx1ZSB9O1xuIl19 */"]
  }, value ? label : placeholder && (0, _react2.jsx)("span", {
    css: _Select.s_selectPlaceholder
  }, placeholder));
}