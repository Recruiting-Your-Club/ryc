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
    }), sx, process.env.NODE_ENV === "production" ? "" : ";label:Divider;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EaXZpZGVyL0RpdmlkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJCZ0IiLCJmaWxlIjoiLi4vLi4vc3JjL0RpdmlkZXIvRGl2aWRlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB0eXBlIHsgSFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZGl2aWRlciB9IGZyb20gJy4vRGl2aWRlci5zdHlsZSc7XG5cbmV4cG9ydCB0eXBlIERpdmlkZXJDb2xvciA9ICdibGFjaycgfCAnZ3JheSc7XG5leHBvcnQgdHlwZSBEaXZpZGVyV2lkdGggPSAnNzAnIHwgJzgwJyB8ICc5MCcgfCAnZnVsbCc7XG5leHBvcnQgdHlwZSBEaXZpZGVyV2VpZ2h0ID0gJzEnIHwgJzInIHwgJzMnO1xuXG5pbnRlcmZhY2UgRGl2aWRlclByb3BzIGV4dGVuZHMgSFRNTEF0dHJpYnV0ZXM8SFRNTEhSRWxlbWVudD4ge1xuICAgIHdpZHRoPzogRGl2aWRlcldpZHRoO1xuICAgIGNvbG9yPzogRGl2aWRlckNvbG9yO1xuICAgIHdlaWdodD86IERpdmlkZXJXZWlnaHQ7XG4gICAgc3g/OiBDU1NPYmplY3Q7XG59XG5mdW5jdGlvbiBEaXZpZGVyKHsgd2lkdGggPSAnZnVsbCcsIGNvbG9yID0gJ2dyYXknLCB3ZWlnaHQgPSAnMScsIHN4LCAuLi5wcm9wcyB9OiBEaXZpZGVyUHJvcHMpIHtcbiAgICAvLyBwcm9wIGRlc3RydWN0aW9uXG4gICAgLy8gbGliIGhvb2tzXG4gICAgLy8gc3RhdGUsIHJlZiwgcXVlcnlzdHJpbmcgaG9va3NcbiAgICAvLyBmb3JtIGhvb2tzXG4gICAgLy8gcXVlcnkgaG9va3NcbiAgICAvLyBjYWxjdWxhdGVkIHZhbHVlc1xuICAgIC8vIGVmZmVjdHNcbiAgICAvLyBoYW5kbGVyc1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxociBjc3M9e1tkaXZpZGVyKHsgd2lkdGgsIGNvbG9yLCB3ZWlnaHQgfSksIHN4XX0gey4uLnByb3BzfSAvPlxuICAgICAgICA8Lz5cbiAgICApO1xufVxuXG5leHBvcnQgeyBEaXZpZGVyIH07XG4iXX0= */"]
  }, props)));
}