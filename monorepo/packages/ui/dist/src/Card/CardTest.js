"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;
var _react = _interopRequireDefault(require("react"));
var _Avatar = require("../Avatar");
var _Divider = require("../Divider");
var _CardBottomBody = require("./CardBottomBody");
var _CardFooter = require("./CardFooter");
var _CardRoot = require("./CardRoot");
var _CardTitleContainer = require("./CardTitleContainer");
var _CardTopBody = require("./CardTopBody");
var _DescriptionText = require("./DescriptionText");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CardTest(_ref) {
  var {
    width,
    radius,
    hover,
    avatarShape = 'square',
    avatarSize = 'xl',
    avatarRadius = '0.3125rem',
    titlePartPaddingLeft = '1.25rem',
    footerHeight,
    imageURL,
    imageName,
    title,
    subTitle,
    description
  } = _ref;
  return (0, _react2.jsx)(_CardRoot.CardRoot, {
    width: width,
    radius: radius,
    hover: hover
  }, (0, _react2.jsx)(_CardTopBody.CardTopBody, null, (0, _react2.jsx)(_Avatar.Avatar, {
    shape: avatarShape,
    size: avatarSize,
    radius: avatarRadius,
    imageURL: imageURL,
    imageName: imageName
  }), (0, _react2.jsx)(_CardTitleContainer.CardTitleContainer, {
    titlePartPaddingLeft: titlePartPaddingLeft,
    title: title,
    subTitle: subTitle
  })), (0, _react2.jsx)(_CardBottomBody.CardBottomBody, null, (0, _react2.jsx)(_DescriptionText.DescriptionText, {
    description: description
  })), (0, _react2.jsx)(_Divider.Divider, null), (0, _react2.jsx)(_CardFooter.CardFooter, {
    footerHeight: footerHeight
  }));
}
var Card = exports.Card = Object.assign(CardTest, {
  Root: _CardRoot.CardRoot,
  TopBody: _CardTopBody.CardTopBody,
  TitleContainer: _CardTitleContainer.CardTitleContainer,
  BottomBody: _CardBottomBody.CardBottomBody,
  DescriptionText: _DescriptionText.DescriptionText,
  Footer: _CardFooter.CardFooter
});