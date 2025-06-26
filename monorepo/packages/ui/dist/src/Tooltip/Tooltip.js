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
    css: [(0, _Tooltip.tooltipStyle)(direction), sx, process.env.NODE_ENV === "production" ? "" : ";label:Tooltip;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Ub29sdGlwL1Rvb2x0aXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNDMEMiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL1Rvb2x0aXAvVG9vbHRpcC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB0b29sdGlwQ29udGFpbnRlciwgdG9vbHRpcFN0eWxlIH0gZnJvbSAnLi9Ub29sdGlwLnN0eWxlJztcbmltcG9ydCB0eXBlIHsgVG9vbHRpcFByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmZ1bmN0aW9uIFRvb2x0aXAoe1xuICAgIGNvbnRlbnQsXG4gICAgZGlyZWN0aW9uID0gJ2JvdHRvbScsXG4gICAgZGVsYXkgPSAxMDAsXG4gICAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgICBjaGlsZHJlbixcbiAgICBzeCxcbn06IFRvb2x0aXBQcm9wcykge1xuICAgIGNvbnN0IFt2aXNpYmxlLCBzZXRWaXNpYmxlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KCk7XG4gICAgY29uc3QgdGltZW91dFJlZiA9IHVzZVJlZjxOb2RlSlMuVGltZW91dD4oKTtcblxuICAgIGNvbnN0IHNob3dUb29sdGlwID0gKCkgPT4ge1xuICAgICAgICB0aW1lb3V0UmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHNldFZpc2libGUodHJ1ZSk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGlkZVRvb2x0aXAgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aW1lb3V0UmVmLmN1cnJlbnQpIGNsZWFyVGltZW91dCh0aW1lb3V0UmVmLmN1cnJlbnQpO1xuICAgICAgICBzZXRWaXNpYmxlKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aW1lb3V0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dFJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17dG9vbHRpcENvbnRhaW50ZXJ9IG9uTW91c2VFbnRlcj17c2hvd1Rvb2x0aXB9IG9uTW91c2VMZWF2ZT17aGlkZVRvb2x0aXB9PlxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgeyFkaXNhYmxlZCAmJiB2aXNpYmxlICYmIDxkaXYgY3NzPXtbdG9vbHRpcFN0eWxlKGRpcmVjdGlvbiksIHN4XX0+e2NvbnRlbnR9PC9kaXY+fVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgeyBUb29sdGlwIH07XG4iXX0= */"]
  }, content));
}