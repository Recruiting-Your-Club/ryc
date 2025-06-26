"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Divider = Divider;
var _react = _interopRequireDefault(require("react"));
var _Divider = require("./Divider.style");
var _react2 = require("@emotion/react");
var _excluded = ["width", "color", "weight", "sx"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function Divider(_ref) {
  var {
      width = 'full',
      color = 'gray',
      weight = '1',
      sx
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("hr", _extends({
    css: [(0, _Divider.divider)({
      width,
      color,
      weight
    }), sx, process.env.NODE_ENV === "production" ? "" : ";label:Divider;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9EaXZpZGVyL0RpdmlkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCZ0IiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0RpdmlkZXIvRGl2aWRlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB0eXBlIHsgSFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBkaXZpZGVyIH0gZnJvbSAnLi9EaXZpZGVyLnN0eWxlJztcblxuZXhwb3J0IHR5cGUgRGl2aWRlckNvbG9yID0gJ2JsYWNrJyB8ICdncmF5JztcbmV4cG9ydCB0eXBlIERpdmlkZXJXaWR0aCA9ICc3MCcgfCAnODAnIHwgJzkwJyB8ICdmdWxsJztcbmV4cG9ydCB0eXBlIERpdmlkZXJXZWlnaHQgPSAnMScgfCAnMicgfCAnMyc7XG5cbmludGVyZmFjZSBEaXZpZGVyUHJvcHMgZXh0ZW5kcyBIVE1MQXR0cmlidXRlczxIVE1MSFJFbGVtZW50PiB7XG4gICAgd2lkdGg/OiBEaXZpZGVyV2lkdGg7XG4gICAgY29sb3I/OiBEaXZpZGVyQ29sb3I7XG4gICAgd2VpZ2h0PzogRGl2aWRlcldlaWdodDtcbiAgICBzeD86IENTU09iamVjdDtcbn1cbmZ1bmN0aW9uIERpdmlkZXIoeyB3aWR0aCA9ICdmdWxsJywgY29sb3IgPSAnZ3JheScsIHdlaWdodCA9ICcxJywgc3gsIC4uLnByb3BzIH06IERpdmlkZXJQcm9wcykge1xuICAgIC8vIHByb3AgZGVzdHJ1Y3Rpb25cbiAgICAvLyBsaWIgaG9va3NcbiAgICAvLyBzdGF0ZSwgcmVmLCBxdWVyeXN0cmluZyBob29rc1xuICAgIC8vIGZvcm0gaG9va3NcbiAgICAvLyBxdWVyeSBob29rc1xuICAgIC8vIGNhbGN1bGF0ZWQgdmFsdWVzXG4gICAgLy8gZWZmZWN0c1xuICAgIC8vIGhhbmRsZXJzXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPGhyIGNzcz17W2RpdmlkZXIoeyB3aWR0aCwgY29sb3IsIHdlaWdodCB9KSwgc3hdfSB7Li4ucHJvcHN9IC8+XG4gICAgICAgIDwvPlxuICAgICk7XG59XG5cbmV4cG9ydCB7IERpdmlkZXIgfTtcbiJdfQ== */"]
  }, props)));
}