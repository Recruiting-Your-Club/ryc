"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectValue = SelectValue;
var _SelectContext = require("./SelectContext");
var _Select = require("./Select.styles");
var _react = _interopRequireDefault(require("react"));
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
    css: [_Select.s_selectValue, sx, process.env.NODE_ENV === "production" ? "" : ";label:SelectValue;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0VmFsdWUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlCYyIsImZpbGUiOiIuLi8uLi9zcmMvU2VsZWN0L1NlbGVjdFZhbHVlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ1NTT2JqZWN0IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0Q29udGV4dCB9IGZyb20gJy4vU2VsZWN0Q29udGV4dCc7XG5pbXBvcnQgeyBzX3NlbGVjdFBsYWNlaG9sZGVyLCBzX3NlbGVjdFZhbHVlIH0gZnJvbSAnLi9TZWxlY3Quc3R5bGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbi8qKlxuICogU2VsZWN0VmFsdWUg7Lu07Y+s64SM7Yq4XG4gKi9cbmludGVyZmFjZSBTZWxlY3RWYWx1ZVByb3BzIHtcbiAgICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgICBzeD86IENTU09iamVjdDtcbn1cblxuZnVuY3Rpb24gU2VsZWN0VmFsdWUoeyBwbGFjZWhvbGRlciwgc3ggfTogU2VsZWN0VmFsdWVQcm9wcykge1xuICAgIGNvbnN0IHsgdmFsdWUsIGxhYmVsIH0gPSB1c2VTZWxlY3RDb250ZXh0KCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c3BhbiBjc3M9e1tzX3NlbGVjdFZhbHVlLCBzeF19PlxuICAgICAgICAgICAge3ZhbHVlID8gbGFiZWwgOiBwbGFjZWhvbGRlciAmJiA8c3BhbiBjc3M9e3Nfc2VsZWN0UGxhY2Vob2xkZXJ9PntwbGFjZWhvbGRlcn08L3NwYW4+fVxuICAgICAgICA8L3NwYW4+XG4gICAgKTtcbn1cblxuZXhwb3J0IHsgU2VsZWN0VmFsdWUgfTtcbiJdfQ== */"]
  }, value ? label : placeholder && (0, _react2.jsx)("span", {
    css: _Select.s_selectPlaceholder
  }, placeholder));
}