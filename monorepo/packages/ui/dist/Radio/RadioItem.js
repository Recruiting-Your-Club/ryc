"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioItem = RadioItem;
var _react = _interopRequireDefault(require("react"));
var _Radio = require("./Radio.style");
var _react2 = require("@emotion/react");
var _excluded = ["option", "checked", "disabled", "onChange"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function RadioItem(_ref) {
  var {
      option,
      checked,
      disabled = false,
      onChange
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  return (0, _react2.jsx)("label", {
    css: (0, _Radio.s_label)(disabled)
  }, (0, _react2.jsx)("input", _extends({
    type: "radio",
    checked: checked,
    onChange: onChange,
    css: _Radio.s_input
  }, props)), (0, _react2.jsx)("span", {
    css: (0, _Radio.s_radio)(checked)
  }), option);
}