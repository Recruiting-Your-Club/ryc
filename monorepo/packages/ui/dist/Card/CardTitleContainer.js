"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardTitleContainer = CardTitleContainer;
var _Text = require("../Text");
var _react = _interopRequireDefault(require("react"));
var _Card = require("./Card.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CardTitleContainer(_ref) {
  var {
    titlePartPaddingLeft,
    title,
    subTitle
  } = _ref;
  return (0, _react2.jsx)("div", {
    css: (0, _Card.titleContainer)(titlePartPaddingLeft)
  }, (0, _react2.jsx)(_Text.Text, {
    as: "span",
    textAlign: "start",
    type: "bodyBold",
    color: "black",
    noWrap: true,
    cropped: true
  }, title), (0, _react2.jsx)(_Text.Text, {
    as: "span",
    textAlign: "start",
    type: "subCaptionRegular",
    color: "helper",
    noWrap: true,
    cropped: true
  }, subTitle));
}