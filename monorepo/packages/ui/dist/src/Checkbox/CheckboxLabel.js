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
    css: [(0, _Checkbox.s_text)(size, disabled), sx, process.env.NODE_ENV === "production" ? "" : ";label:CheckboxLabel;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DaGVja2JveC9DaGVja2JveExhYmVsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3QmdDIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9DaGVja2JveC9DaGVja2JveExhYmVsLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ1NTT2JqZWN0IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgc190ZXh0IH0gZnJvbSAnLi9DaGVja2JveC5zdHlsZSc7XG5pbXBvcnQgeyB1c2VDaGVja2JveENvbnRleHQgfSBmcm9tICcuL0NoZWNrYm94Q29udGV4dCc7XG5cbmludGVyZmFjZSBMYWJlbFByb3BzIHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICAgIHN4PzogQ1NTT2JqZWN0O1xufVxuZnVuY3Rpb24gQ2hlY2tib3hMYWJlbCh7IGNoaWxkcmVuLCBzeCB9OiBMYWJlbFByb3BzKSB7XG4gICAgLy8gcHJvcCBkZXN0cnVjdGlvblxuICAgIC8vIGxpYiBob29rc1xuICAgIGNvbnN0IHsgaWQsIHNpemUsIGRpc2FibGVkIH0gPSB1c2VDaGVja2JveENvbnRleHQoKTtcblxuICAgIC8vIHN0YXRlLCByZWYsIHF1ZXJ5c3RyaW5nIGhvb2tzXG4gICAgLy8gZm9ybSBob29rc1xuICAgIC8vIHF1ZXJ5IGhvb2tzXG4gICAgLy8gY2FsY3VsYXRlZCB2YWx1ZXNcbiAgICAvLyBlZmZlY3RzXG4gICAgLy8gaGFuZGxlcnNcblxuICAgIHJldHVybiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17aWR9IGNzcz17W3NfdGV4dChzaXplLCBkaXNhYmxlZCksIHN4XX0+XG4gICAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC8+XG4gICAgKTtcbn1cbmV4cG9ydCB7IENoZWNrYm94TGFiZWwgfTtcbiJdfQ== */"]
  }, children));
}