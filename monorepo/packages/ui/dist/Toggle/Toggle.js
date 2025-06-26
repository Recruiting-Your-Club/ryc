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
    css: [(0, _Toggle.toggleContainer)(isChecked, size), sx, process.env.NODE_ENV === "production" ? "" : ";label:Toggle;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ub2dnbGUvVG9nZ2xlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNZSIsImZpbGUiOiIuLi8uLi9zcmMvVG9nZ2xlL1RvZ2dsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgaGlkZGVuQ2hlY2tib3gsIHRvZ2dsZUNvbnRhaW5lciwgdG9nZ2xlQ2lyY2xlIH0gZnJvbSAnLi9Ub2dnbGUuc3R5bGUnO1xuaW1wb3J0IHR5cGUgeyBUb2dnbGVQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuXG5mdW5jdGlvbiBUb2dnbGUoeyBpc0NoZWNrZWQgPSBmYWxzZSwgc2l6ZSA9ICdtZCcsIHN4LCBoYW5kbGVUb2dnbGUsIC4uLnByb3BzIH06IFRvZ2dsZVByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGxhYmVsIGNzcz17W3RvZ2dsZUNvbnRhaW5lcihpc0NoZWNrZWQsIHNpemUpLCBzeF19PlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICBjc3M9e2hpZGRlbkNoZWNrYm94fVxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2lzQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlVG9nZ2xlfVxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNzcz17dG9nZ2xlQ2lyY2xlKGlzQ2hlY2tlZCwgc2l6ZSl9IC8+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgKTtcbn1cblxuZXhwb3J0IHsgVG9nZ2xlIH07XG4iXX0= */"]
  }, (0, _react2.jsx)("input", _extends({
    type: "checkbox",
    css: _Toggle.hiddenCheckbox,
    checked: isChecked,
    onChange: handleToggle
  }, props)), (0, _react2.jsx)("div", {
    css: (0, _Toggle.toggleCircle)(isChecked, size)
  }));
}