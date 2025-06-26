"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxControl = CheckboxControl;
var _react = _interopRequireDefault(require("react"));
var _checkbox_check = _interopRequireDefault(require("@ssoc/assets/images/checkbox_check.svg"));
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
    css: [cssProp, sx, process.env.NODE_ENV === "production" ? "" : ";label:CheckboxControl;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DaGVja2JveC9DaGVja2JveENvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdDWSIsImZpbGUiOiIuLi8uLi8uLi9zcmMvQ2hlY2tib3gvQ2hlY2tib3hDb250cm9sLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ1NTT2JqZWN0IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IENoZWNrIGZyb20gJ0Bzc29jL2Fzc2V0cy9pbWFnZXMvY2hlY2tib3hfY2hlY2suc3ZnJztcblxuaW1wb3J0IHsgc19zaXplLCBzX3N2Z0NvbG9yLCBzX3ZhcmlhbnQgfSBmcm9tICcuL0NoZWNrYm94LnN0eWxlJztcbmltcG9ydCB7IHVzZUNoZWNrYm94Q29udGV4dCB9IGZyb20gJy4vQ2hlY2tib3hDb250ZXh0JztcblxuZnVuY3Rpb24gQ2hlY2tib3hDb250cm9sKHsgc3ggfTogQ1NTT2JqZWN0KSB7XG4gICAgLy8gcHJvcCBkZXN0cnVjdGlvblxuICAgIC8vIGxpYiBob29rc1xuICAgIGNvbnN0IHsgaXNDaGVja2VkLCBvbkNoYW5nZSwgdmFyaWFudCwgc2l6ZSwgY29sb3IsIGRlZmF1bHRDaGVja2VkLCBkaXNhYmxlZCB9ID1cbiAgICAgICAgdXNlQ2hlY2tib3hDb250ZXh0KCk7XG5cbiAgICAvLyBzdGF0ZSwgcmVmLCBxdWVyeXN0cmluZyBob29rc1xuICAgIC8vIGZvcm0gaG9va3NcbiAgICAvLyBxdWVyeSBob29rc1xuICAgIC8vIGNhbGN1bGF0ZWQgdmFsdWVzXG4gICAgY29uc3QgY3NzUHJvcCA9IFtzX3ZhcmlhbnQoaXNDaGVja2VkLCB2YXJpYW50LCBjb2xvciwgZGVmYXVsdENoZWNrZWQsIGRpc2FibGVkKSwgc19zaXplKHNpemUpXTtcblxuICAgIC8vIGVmZmVjdHNcbiAgICAvLyBoYW5kbGVyc1xuICAgIGNvbnN0IG9uS2V5RG93bkhhbmRsZXIgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICcgJyB8fCBlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgb25DaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNoYW5nZX1cbiAgICAgICAgICAgIGNzcz17W2Nzc1Byb3AsIHN4XX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KCkgPT4gb25LZXlEb3duSGFuZGxlcn1cbiAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17aXNDaGVja2VkfVxuICAgICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgICByb2xlPVwiY2hlY2tib3hcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8Q2hlY2sgY3NzPXtbc19zdmdDb2xvcih2YXJpYW50LCBjb2xvciwgaXNDaGVja2VkLCBkZWZhdWx0Q2hlY2tlZCwgZGlzYWJsZWQpXX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbmV4cG9ydCB7IENoZWNrYm94Q29udHJvbCB9O1xuIl19 */"],
    onKeyDown: () => onKeyDownHandler,
    "aria-checked": isChecked,
    tabIndex: 0,
    role: "checkbox"
  }, (0, _react2.jsx)(_checkbox_check.default, {
    css: [(0, _Checkbox.s_svgColor)(variant, color, isChecked, defaultChecked, disabled), process.env.NODE_ENV === "production" ? "" : ";label:CheckboxControl;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DaGVja2JveC9DaGVja2JveENvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNDbUIiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0NoZWNrYm94L0NoZWNrYm94Q29udHJvbC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBDaGVjayBmcm9tICdAc3NvYy9hc3NldHMvaW1hZ2VzL2NoZWNrYm94X2NoZWNrLnN2Zyc7XG5cbmltcG9ydCB7IHNfc2l6ZSwgc19zdmdDb2xvciwgc192YXJpYW50IH0gZnJvbSAnLi9DaGVja2JveC5zdHlsZSc7XG5pbXBvcnQgeyB1c2VDaGVja2JveENvbnRleHQgfSBmcm9tICcuL0NoZWNrYm94Q29udGV4dCc7XG5cbmZ1bmN0aW9uIENoZWNrYm94Q29udHJvbCh7IHN4IH06IENTU09iamVjdCkge1xuICAgIC8vIHByb3AgZGVzdHJ1Y3Rpb25cbiAgICAvLyBsaWIgaG9va3NcbiAgICBjb25zdCB7IGlzQ2hlY2tlZCwgb25DaGFuZ2UsIHZhcmlhbnQsIHNpemUsIGNvbG9yLCBkZWZhdWx0Q2hlY2tlZCwgZGlzYWJsZWQgfSA9XG4gICAgICAgIHVzZUNoZWNrYm94Q29udGV4dCgpO1xuXG4gICAgLy8gc3RhdGUsIHJlZiwgcXVlcnlzdHJpbmcgaG9va3NcbiAgICAvLyBmb3JtIGhvb2tzXG4gICAgLy8gcXVlcnkgaG9va3NcbiAgICAvLyBjYWxjdWxhdGVkIHZhbHVlc1xuICAgIGNvbnN0IGNzc1Byb3AgPSBbc192YXJpYW50KGlzQ2hlY2tlZCwgdmFyaWFudCwgY29sb3IsIGRlZmF1bHRDaGVja2VkLCBkaXNhYmxlZCksIHNfc2l6ZShzaXplKV07XG5cbiAgICAvLyBlZmZlY3RzXG4gICAgLy8gaGFuZGxlcnNcbiAgICBjb25zdCBvbktleURvd25IYW5kbGVyID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnICcgfHwgZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIG9uQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgb25DbGljaz17b25DaGFuZ2V9XG4gICAgICAgICAgICBjc3M9e1tjc3NQcm9wLCBzeF19XG4gICAgICAgICAgICBvbktleURvd249eygpID0+IG9uS2V5RG93bkhhbmRsZXJ9XG4gICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e2lzQ2hlY2tlZH1cbiAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgcm9sZT1cImNoZWNrYm94XCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPENoZWNrIGNzcz17W3Nfc3ZnQ29sb3IodmFyaWFudCwgY29sb3IsIGlzQ2hlY2tlZCwgZGVmYXVsdENoZWNrZWQsIGRpc2FibGVkKV19IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5leHBvcnQgeyBDaGVja2JveENvbnRyb2wgfTtcbiJdfQ== */"]
  }));
}