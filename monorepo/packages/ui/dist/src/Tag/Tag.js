"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tag = Tag;
var _react = _interopRequireDefault(require("react"));
var _Tag = require("./Tag.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Tag(_ref) {
  var {
    text = 'sample',
    variant = 'primary',
    sx
  } = _ref;
  return (0, _react2.jsx)("div", null, (0, _react2.jsx)("span", {
    css: [(0, _Tag.tag)(variant), sx, process.env.NODE_ENV === "production" ? "" : ";label:Tag;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UYWcvVGFnLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFla0IiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL1RhZy9UYWcudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDU1NPYmplY3QgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB0YWcgfSBmcm9tICcuL1RhZy5zdHlsZSc7XG5cbmV4cG9ydCB0eXBlIHRhZ1ZhcmlhbnQgPSAncHJpbWFyeScgfCAncHJvZ3Jlc3MnIHwgJ2VuZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGFnUHJvcHMge1xuICAgIHRleHQ6IHN0cmluZztcbiAgICB2YXJpYW50OiB0YWdWYXJpYW50O1xuICAgIHN4PzogQ1NTT2JqZWN0O1xufVxuZnVuY3Rpb24gVGFnKHsgdGV4dCA9ICdzYW1wbGUnLCB2YXJpYW50ID0gJ3ByaW1hcnknLCBzeCB9OiBUYWdQcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3BhbiBjc3M9e1t0YWcodmFyaWFudCksIHN4XX0+e3RleHR9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuZXhwb3J0IHsgVGFnIH07XG4iXX0= */"]
  }, text));
}