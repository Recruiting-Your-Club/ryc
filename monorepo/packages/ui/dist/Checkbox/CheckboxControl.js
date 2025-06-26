"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxControl = CheckboxControl;
var _checkbox_check = _interopRequireDefault(require("@ssoc/assets/images/checkbox_check.svg"));
var _react = _interopRequireDefault(require("react"));
var _Checkbox = require("./Checkbox.style");
var _CheckboxContext = require("./CheckboxContext");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CheckboxControl(_ref) {
  var {
    sx
  } = _ref;
  var {
    isChecked,
    onChange,
    variant,
    size,
    color,
    defaultChecked,
    disabled
  } = (0, _CheckboxContext.useCheckboxContext)();
  var cssProp = [(0, _Checkbox.s_variant)(isChecked, variant, color, defaultChecked, disabled), (0, _Checkbox.s_size)(size)];
  var onKeyDownHandler = e => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange();
    }
  };
  return (0, _react2.jsx)("div", {
    onClick: onChange,
    css: [cssProp, sx, process.env.NODE_ENV === "production" ? "" : ";label:CheckboxControl;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DaGVja2JveC9DaGVja2JveENvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThCWSIsImZpbGUiOiIuLi8uLi9zcmMvQ2hlY2tib3gvQ2hlY2tib3hDb250cm9sLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDaGVjayBmcm9tICdAc3NvYy9hc3NldHMvaW1hZ2VzL2NoZWNrYm94X2NoZWNrLnN2Zyc7XG5pbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzX3NpemUsIHNfc3ZnQ29sb3IsIHNfdmFyaWFudCB9IGZyb20gJy4vQ2hlY2tib3guc3R5bGUnO1xuaW1wb3J0IHsgdXNlQ2hlY2tib3hDb250ZXh0IH0gZnJvbSAnLi9DaGVja2JveENvbnRleHQnO1xuXG5mdW5jdGlvbiBDaGVja2JveENvbnRyb2woeyBzeCB9OiBDU1NPYmplY3QpIHtcbiAgICAvLyBwcm9wIGRlc3RydWN0aW9uXG4gICAgLy8gbGliIGhvb2tzXG4gICAgY29uc3QgeyBpc0NoZWNrZWQsIG9uQ2hhbmdlLCB2YXJpYW50LCBzaXplLCBjb2xvciwgZGVmYXVsdENoZWNrZWQsIGRpc2FibGVkIH0gPVxuICAgICAgICB1c2VDaGVja2JveENvbnRleHQoKTtcblxuICAgIC8vIHN0YXRlLCByZWYsIHF1ZXJ5c3RyaW5nIGhvb2tzXG4gICAgLy8gZm9ybSBob29rc1xuICAgIC8vIHF1ZXJ5IGhvb2tzXG4gICAgLy8gY2FsY3VsYXRlZCB2YWx1ZXNcbiAgICBjb25zdCBjc3NQcm9wID0gW3NfdmFyaWFudChpc0NoZWNrZWQsIHZhcmlhbnQsIGNvbG9yLCBkZWZhdWx0Q2hlY2tlZCwgZGlzYWJsZWQpLCBzX3NpemUoc2l6ZSldO1xuXG4gICAgLy8gZWZmZWN0c1xuICAgIC8vIGhhbmRsZXJzXG4gICAgY29uc3Qgb25LZXlEb3duSGFuZGxlciA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBvbkNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2hhbmdlfVxuICAgICAgICAgICAgY3NzPXtbY3NzUHJvcCwgc3hdfVxuICAgICAgICAgICAgb25LZXlEb3duPXsoKSA9PiBvbktleURvd25IYW5kbGVyfVxuICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtpc0NoZWNrZWR9XG4gICAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICAgIHJvbGU9XCJjaGVja2JveFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxDaGVjayBjc3M9e1tzX3N2Z0NvbG9yKHZhcmlhbnQsIGNvbG9yLCBpc0NoZWNrZWQsIGRlZmF1bHRDaGVja2VkLCBkaXNhYmxlZCldfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuZXhwb3J0IHsgQ2hlY2tib3hDb250cm9sIH07XG4iXX0= */"],
    onKeyDown: () => onKeyDownHandler,
    "aria-checked": isChecked,
    tabIndex: 0,
    role: "checkbox"
  }, (0, _react2.jsx)(_checkbox_check.default, {
    css: [(0, _Checkbox.s_svgColor)(variant, color, isChecked, defaultChecked, disabled), process.env.NODE_ENV === "production" ? "" : ";label:CheckboxControl;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DaGVja2JveC9DaGVja2JveENvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9DbUIiLCJmaWxlIjoiLi4vLi4vc3JjL0NoZWNrYm94L0NoZWNrYm94Q29udHJvbC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ2hlY2sgZnJvbSAnQHNzb2MvYXNzZXRzL2ltYWdlcy9jaGVja2JveF9jaGVjay5zdmcnO1xuaW1wb3J0IHR5cGUgeyBDU1NPYmplY3QgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc19zaXplLCBzX3N2Z0NvbG9yLCBzX3ZhcmlhbnQgfSBmcm9tICcuL0NoZWNrYm94LnN0eWxlJztcbmltcG9ydCB7IHVzZUNoZWNrYm94Q29udGV4dCB9IGZyb20gJy4vQ2hlY2tib3hDb250ZXh0JztcblxuZnVuY3Rpb24gQ2hlY2tib3hDb250cm9sKHsgc3ggfTogQ1NTT2JqZWN0KSB7XG4gICAgLy8gcHJvcCBkZXN0cnVjdGlvblxuICAgIC8vIGxpYiBob29rc1xuICAgIGNvbnN0IHsgaXNDaGVja2VkLCBvbkNoYW5nZSwgdmFyaWFudCwgc2l6ZSwgY29sb3IsIGRlZmF1bHRDaGVja2VkLCBkaXNhYmxlZCB9ID1cbiAgICAgICAgdXNlQ2hlY2tib3hDb250ZXh0KCk7XG5cbiAgICAvLyBzdGF0ZSwgcmVmLCBxdWVyeXN0cmluZyBob29rc1xuICAgIC8vIGZvcm0gaG9va3NcbiAgICAvLyBxdWVyeSBob29rc1xuICAgIC8vIGNhbGN1bGF0ZWQgdmFsdWVzXG4gICAgY29uc3QgY3NzUHJvcCA9IFtzX3ZhcmlhbnQoaXNDaGVja2VkLCB2YXJpYW50LCBjb2xvciwgZGVmYXVsdENoZWNrZWQsIGRpc2FibGVkKSwgc19zaXplKHNpemUpXTtcblxuICAgIC8vIGVmZmVjdHNcbiAgICAvLyBoYW5kbGVyc1xuICAgIGNvbnN0IG9uS2V5RG93bkhhbmRsZXIgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICcgJyB8fCBlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgb25DaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNoYW5nZX1cbiAgICAgICAgICAgIGNzcz17W2Nzc1Byb3AsIHN4XX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KCkgPT4gb25LZXlEb3duSGFuZGxlcn1cbiAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17aXNDaGVja2VkfVxuICAgICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgICByb2xlPVwiY2hlY2tib3hcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8Q2hlY2sgY3NzPXtbc19zdmdDb2xvcih2YXJpYW50LCBjb2xvciwgaXNDaGVja2VkLCBkZWZhdWx0Q2hlY2tlZCwgZGlzYWJsZWQpXX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbmV4cG9ydCB7IENoZWNrYm94Q29udHJvbCB9O1xuIl19 */"]
  }));
}