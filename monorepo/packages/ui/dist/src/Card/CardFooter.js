"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardFooter = CardFooter;
var _react = _interopRequireDefault(require("react"));
var _Card = require("./Card.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CardFooter(_ref) {
  var {
    footerHeight = '3.3rem',
    children
  } = _ref;
  return (0, _react2.jsx)("div", {
    css: (0, _Card.footerContainer)(footerHeight)
  }, children);
}