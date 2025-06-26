"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardBottomBody = CardBottomBody;
var _react = _interopRequireDefault(require("react"));
var _Card = require("./Card.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CardBottomBody(_ref) {
  var {
    children
  } = _ref;
  return (0, _react2.jsx)("div", {
    css: _Card.cardBottomContainer
  }, children);
}