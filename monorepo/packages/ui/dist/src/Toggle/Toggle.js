"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toggle = Toggle;
var _react = _interopRequireDefault(require("react"));
var _Toggle = require("./Toggle.style");
var _react2 = require("@emotion/react");
var _excluded = ["isChecked", "size", "sx", "handleToggle"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function Toggle(_ref) {
  var {
      isChecked = false,
      size = 'md',
      sx,
      handleToggle
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  return (0, _react2.jsx)("label", {
    css: [(0, _Toggle.toggleContainer)(isChecked, size), sx, process.env.NODE_ENV === "production" ? "" : ";label:Toggle;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Ub2dnbGUvVG9nZ2xlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPZSIsImZpbGUiOiIuLi8uLi8uLi9zcmMvVG9nZ2xlL1RvZ2dsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBoaWRkZW5DaGVja2JveCwgdG9nZ2xlQ2lyY2xlLCB0b2dnbGVDb250YWluZXIgfSBmcm9tICcuL1RvZ2dsZS5zdHlsZSc7XG5pbXBvcnQgdHlwZSB7IFRvZ2dsZVByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmZ1bmN0aW9uIFRvZ2dsZSh7IGlzQ2hlY2tlZCA9IGZhbHNlLCBzaXplID0gJ21kJywgc3gsIGhhbmRsZVRvZ2dsZSwgLi4ucHJvcHMgfTogVG9nZ2xlUHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8bGFiZWwgY3NzPXtbdG9nZ2xlQ29udGFpbmVyKGlzQ2hlY2tlZCwgc2l6ZSksIHN4XX0+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgIGNzcz17aGlkZGVuQ2hlY2tib3h9XG4gICAgICAgICAgICAgICAgY2hlY2tlZD17aXNDaGVja2VkfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVUb2dnbGV9XG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY3NzPXt0b2dnbGVDaXJjbGUoaXNDaGVja2VkLCBzaXplKX0gLz5cbiAgICAgICAgPC9sYWJlbD5cbiAgICApO1xufVxuXG5leHBvcnQgeyBUb2dnbGUgfTtcbiJdfQ== */"]
  }, (0, _react2.jsx)("input", _extends({
    type: "checkbox",
    css: _Toggle.hiddenCheckbox,
    checked: isChecked,
    onChange: handleToggle
  }, props)), (0, _react2.jsx)("div", {
    css: (0, _Toggle.toggleCircle)(isChecked, size)
  }));
}