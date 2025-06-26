"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectSeparator = SelectSeparator;
var _react = _interopRequireDefault(require("react"));
var _Select = require("./Select.styles");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SelectSeparator(props) {
  return (0, _react2.jsx)("div", _extends({
    role: "separator",
    css: _Select.s_selectSeperator
  }, props));
}