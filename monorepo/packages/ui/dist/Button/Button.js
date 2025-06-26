"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = Button;
var _react = _interopRequireDefault(require("react"));
var _Button = require("./Button.style");
var _LoadingSpinner = require("../LoadingSpinner");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Button(_ref) {
  var {
    variant = 'primary',
    size = 'xl',
    children,
    disabled = false,
    radius = '0.6rem',
    zIndex = 0,
    loading = false,
    sx,
    type = 'button',
    'aria-label': ariaLabel,
    onClick
  } = _ref;
  var cssProp = [(0, _Button.s_base)(radius, zIndex), (0, _Button.s_size)(size)];
  if (variant) cssProp.push((0, _Button.s_variant)(variant));
  return (0, _react2.jsx)("button", {
    disabled: disabled,
    onClick: onClick,
    type: type,
    "aria-label": ariaLabel,
    css: [cssProp, sx, process.env.NODE_ENV === "production" ? "" : ";label:Button;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9CdXR0b24vQnV0dG9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5Q1kiLCJmaWxlIjoiLi4vLi4vc3JjL0J1dHRvbi9CdXR0b24udHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHNfc2l6ZSwgc19iYXNlLCBzX3ZhcmlhbnQgfSBmcm9tICcuL0J1dHRvbi5zdHlsZSc7XG5pbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB0eXBlIHsgQnV0dG9uSFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQdWxzZVNwaW5uZXIgfSBmcm9tICcuLi9Mb2FkaW5nU3Bpbm5lcic7XG5cbmV4cG9ydCB0eXBlIEJ1dHRvblNpemUgPSAneHMnIHwgJ3MnIHwgJ21kJyB8ICdsZycgfCAneGwnIHwgJ2Z1bGwnO1xuZXhwb3J0IHR5cGUgQnV0dG9uVmFyaWFudCA9ICdwcmltYXJ5JyB8ICdvdXRsaW5lZCcgfCAndHJhbnNwYXJlbnQnIHwgJ3RleHQnO1xuXG5pbnRlcmZhY2UgQnV0dG9uUHJvcHMgZXh0ZW5kcyBCdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4ge1xuICAgIHZhcmlhbnQ/OiBCdXR0b25WYXJpYW50O1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgICBzaXplPzogQnV0dG9uU2l6ZTtcbiAgICBsb2FkaW5nPzogYm9vbGVhbjtcbiAgICBzeD86IENTU09iamVjdDtcbiAgICByYWRpdXM/OiBzdHJpbmc7XG4gICAgekluZGV4PzogbnVtYmVyO1xufVxuZnVuY3Rpb24gQnV0dG9uKHtcbiAgICB2YXJpYW50ID0gJ3ByaW1hcnknLFxuICAgIHNpemUgPSAneGwnLFxuICAgIGNoaWxkcmVuLFxuICAgIGRpc2FibGVkID0gZmFsc2UsXG4gICAgcmFkaXVzID0gJzAuNnJlbScsXG4gICAgekluZGV4ID0gMCxcbiAgICBsb2FkaW5nID0gZmFsc2UsXG4gICAgc3gsXG4gICAgdHlwZSA9ICdidXR0b24nLFxuICAgICdhcmlhLWxhYmVsJzogYXJpYUxhYmVsLFxuICAgIG9uQ2xpY2ssXG59OiBCdXR0b25Qcm9wcykge1xuICAgIGNvbnN0IGNzc1Byb3AgPSBbc19iYXNlKHJhZGl1cywgekluZGV4KSwgc19zaXplKHNpemUpXTtcblxuICAgIGlmICh2YXJpYW50KSBjc3NQcm9wLnB1c2goc192YXJpYW50KHZhcmlhbnQpKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICB0eXBlPXt0eXBlfVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgICAgICAgY3NzPXtbY3NzUHJvcCwgc3hdfVxuICAgICAgICA+XG4gICAgICAgICAgICB7bG9hZGluZyAmJiA8UHVsc2VTcGlubmVyIC8+fVxuICAgICAgICAgICAgeyFsb2FkaW5nICYmIGNoaWxkcmVufVxuICAgICAgICA8L2J1dHRvbj5cbiAgICApO1xufVxuZXhwb3J0IHsgQnV0dG9uIH07XG4iXX0= */"]
  }, loading && (0, _react2.jsx)(_LoadingSpinner.PulseSpinner, null), !loading && children);
}