"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = Avatar;
var _basicImage = _interopRequireDefault(require("@ssoc/assets/images/basicImage.png"));
var _react = _interopRequireDefault(require("react"));
var _Avatar = require("./Avatar.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Avatar(_ref) {
  var {
    shape = 'square',
    size = 'xl',
    radius,
    imageURL,
    imageName
  } = _ref;
  var cssProp = [(0, _Avatar.s_size)(size)];
  if (shape) cssProp.push((0, _Avatar.s_shape)(shape, radius));
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("img", {
    src: imageURL ? imageURL : _basicImage.default,
    alt: imageName ? imageName : 'BasicImage',
    css: cssProp
  }));
}