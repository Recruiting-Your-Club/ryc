"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = Button;
var _react = _interopRequireDefault(require("react"));
var _LoadingSpinner = require("../LoadingSpinner");
var _Button = require("./Button.style");
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
    css: [cssProp, sx, process.env.NODE_ENV === "production" ? "" : ";label:Button;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9CdXR0b24vQnV0dG9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQ1kiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0J1dHRvbi9CdXR0b24udHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDU1NPYmplY3QgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBCdXR0b25IVE1MQXR0cmlidXRlcyB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgUHVsc2VTcGlubmVyIH0gZnJvbSAnLi4vTG9hZGluZ1NwaW5uZXInO1xuaW1wb3J0IHsgc19iYXNlLCBzX3NpemUsIHNfdmFyaWFudCB9IGZyb20gJy4vQnV0dG9uLnN0eWxlJztcblxuZXhwb3J0IHR5cGUgQnV0dG9uU2l6ZSA9ICd4cycgfCAncycgfCAnbWQnIHwgJ2xnJyB8ICd4bCcgfCAnZnVsbCc7XG5leHBvcnQgdHlwZSBCdXR0b25WYXJpYW50ID0gJ3ByaW1hcnknIHwgJ291dGxpbmVkJyB8ICd0cmFuc3BhcmVudCcgfCAndGV4dCc7XG5cbmludGVyZmFjZSBCdXR0b25Qcm9wcyBleHRlbmRzIEJ1dHRvbkhUTUxBdHRyaWJ1dGVzPEhUTUxCdXR0b25FbGVtZW50PiB7XG4gICAgdmFyaWFudD86IEJ1dHRvblZhcmlhbnQ7XG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICAgIHNpemU/OiBCdXR0b25TaXplO1xuICAgIGxvYWRpbmc/OiBib29sZWFuO1xuICAgIHN4PzogQ1NTT2JqZWN0O1xuICAgIHJhZGl1cz86IHN0cmluZztcbiAgICB6SW5kZXg/OiBudW1iZXI7XG59XG5mdW5jdGlvbiBCdXR0b24oe1xuICAgIHZhcmlhbnQgPSAncHJpbWFyeScsXG4gICAgc2l6ZSA9ICd4bCcsXG4gICAgY2hpbGRyZW4sXG4gICAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgICByYWRpdXMgPSAnMC42cmVtJyxcbiAgICB6SW5kZXggPSAwLFxuICAgIGxvYWRpbmcgPSBmYWxzZSxcbiAgICBzeCxcbiAgICB0eXBlID0gJ2J1dHRvbicsXG4gICAgJ2FyaWEtbGFiZWwnOiBhcmlhTGFiZWwsXG4gICAgb25DbGljayxcbn06IEJ1dHRvblByb3BzKSB7XG4gICAgY29uc3QgY3NzUHJvcCA9IFtzX2Jhc2UocmFkaXVzLCB6SW5kZXgpLCBzX3NpemUoc2l6ZSldO1xuXG4gICAgaWYgKHZhcmlhbnQpIGNzc1Byb3AucHVzaChzX3ZhcmlhbnQodmFyaWFudCkpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgICAgICBjc3M9e1tjc3NQcm9wLCBzeF19XG4gICAgICAgID5cbiAgICAgICAgICAgIHtsb2FkaW5nICYmIDxQdWxzZVNwaW5uZXIgLz59XG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgY2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICk7XG59XG5leHBvcnQgeyBCdXR0b24gfTtcbiJdfQ== */"]
  }, loading && (0, _react2.jsx)(_LoadingSpinner.PulseSpinner, null), !loading && children);
}