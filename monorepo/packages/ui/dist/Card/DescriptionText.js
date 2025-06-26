"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DescriptionText = DescriptionText;
var _Text = require("../Text");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function DescriptionText(_ref) {
  var {
    description
  } = _ref;
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Text.Text, {
    as: "span",
    textAlign: "start",
    type: "helperTextBold",
    color: "subCaption"
  }, description));
}