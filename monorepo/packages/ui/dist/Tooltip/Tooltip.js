"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = Tooltip;
var _react = _interopRequireWildcard(require("react"));
var _Tooltip = require("./Tooltip.style");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function Tooltip(_ref) {
  var {
    content,
    direction = 'bottom',
    delay = 100,
    disabled = false,
    children,
    sx
  } = _ref;
  var [visible, setVisible] = (0, _react.useState)();
  var timeoutRef = (0, _react.useRef)();
  var showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };
  var hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };
  (0, _react.useEffect)(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return (0, _react2.jsx)("div", {
    css: _Tooltip.tooltipContainter,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip
  }, children, !disabled && visible && (0, _react2.jsx)("div", {
    css: [(0, _Tooltip.tooltipStyle)(direction), sx, process.env.NODE_ENV === "production" ? "" : ";label:Tooltip;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ub29sdGlwL1Rvb2x0aXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFDMEMiLCJmaWxlIjoiLi4vLi4vc3JjL1Rvb2x0aXAvVG9vbHRpcC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdG9vbHRpcENvbnRhaW50ZXIsIHRvb2x0aXBTdHlsZSB9IGZyb20gJy4vVG9vbHRpcC5zdHlsZSc7XG5pbXBvcnQgdHlwZSB7IFRvb2x0aXBQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuXG5mdW5jdGlvbiBUb29sdGlwKHtcbiAgICBjb250ZW50LFxuICAgIGRpcmVjdGlvbiA9ICdib3R0b20nLFxuICAgIGRlbGF5ID0gMTAwLFxuICAgIGRpc2FibGVkID0gZmFsc2UsXG4gICAgY2hpbGRyZW4sXG4gICAgc3gsXG59OiBUb29sdGlwUHJvcHMpIHtcbiAgICBjb25zdCBbdmlzaWJsZSwgc2V0VmlzaWJsZV0gPSB1c2VTdGF0ZTxib29sZWFuPigpO1xuICAgIGNvbnN0IHRpbWVvdXRSZWYgPSB1c2VSZWY8Tm9kZUpTLlRpbWVvdXQ+KCk7XG5cbiAgICBjb25zdCBzaG93VG9vbHRpcCA9ICgpID0+IHtcbiAgICAgICAgdGltZW91dFJlZi5jdXJyZW50ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzZXRWaXNpYmxlKHRydWUpO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhpZGVUb29sdGlwID0gKCkgPT4ge1xuICAgICAgICBpZiAodGltZW91dFJlZi5jdXJyZW50KSBjbGVhclRpbWVvdXQodGltZW91dFJlZi5jdXJyZW50KTtcbiAgICAgICAgc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgfTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGltZW91dFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3Rvb2x0aXBDb250YWludGVyfSBvbk1vdXNlRW50ZXI9e3Nob3dUb29sdGlwfSBvbk1vdXNlTGVhdmU9e2hpZGVUb29sdGlwfT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgIHshZGlzYWJsZWQgJiYgdmlzaWJsZSAmJiA8ZGl2IGNzcz17W3Rvb2x0aXBTdHlsZShkaXJlY3Rpb24pLCBzeF19Pntjb250ZW50fTwvZGl2Pn1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IHsgVG9vbHRpcCB9O1xuIl19 */"]
  }, content));
}