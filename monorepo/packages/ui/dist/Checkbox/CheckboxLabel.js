"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxLabel = CheckboxLabel;
var _react = _interopRequireDefault(require("react"));
var _Checkbox = require("./Checkbox.style");
var _CheckboxContext = require("./CheckboxContext");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CheckboxLabel(_ref) {
  var {
    children,
    sx
  } = _ref;
  var {
    id,
    size,
    disabled
  } = (0, _CheckboxContext.useCheckboxContext)();
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("label", {
    htmlFor: id,
    css: [(0, _Checkbox.s_text)(size, disabled), sx, process.env.NODE_ENV === "production" ? "" : ";label:CheckboxLabel;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DaGVja2JveC9DaGVja2JveExhYmVsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1QmdDIiwiZmlsZSI6Ii4uLy4uL3NyYy9DaGVja2JveC9DaGVja2JveExhYmVsLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ1NTT2JqZWN0IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHNfdGV4dCB9IGZyb20gJy4vQ2hlY2tib3guc3R5bGUnO1xuaW1wb3J0IHsgdXNlQ2hlY2tib3hDb250ZXh0IH0gZnJvbSAnLi9DaGVja2JveENvbnRleHQnO1xuXG5pbnRlcmZhY2UgTGFiZWxQcm9wcyB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgICBzeD86IENTU09iamVjdDtcbn1cbmZ1bmN0aW9uIENoZWNrYm94TGFiZWwoeyBjaGlsZHJlbiwgc3ggfTogTGFiZWxQcm9wcykge1xuICAgIC8vIHByb3AgZGVzdHJ1Y3Rpb25cbiAgICAvLyBsaWIgaG9va3NcbiAgICBjb25zdCB7IGlkLCBzaXplLCBkaXNhYmxlZCB9ID0gdXNlQ2hlY2tib3hDb250ZXh0KCk7XG5cbiAgICAvLyBzdGF0ZSwgcmVmLCBxdWVyeXN0cmluZyBob29rc1xuICAgIC8vIGZvcm0gaG9va3NcbiAgICAvLyBxdWVyeSBob29rc1xuICAgIC8vIGNhbGN1bGF0ZWQgdmFsdWVzXG4gICAgLy8gZWZmZWN0c1xuICAgIC8vIGhhbmRsZXJzXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2lkfSBjc3M9e1tzX3RleHQoc2l6ZSwgZGlzYWJsZWQpLCBzeF19PlxuICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvPlxuICAgICk7XG59XG5leHBvcnQgeyBDaGVja2JveExhYmVsIH07XG4iXX0= */"]
  }, children));
}