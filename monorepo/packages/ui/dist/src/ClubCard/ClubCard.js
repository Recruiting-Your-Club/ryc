"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClubCard = ClubCard;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("@ssoc/hooks");
var _Avatar = require("../Avatar/Avatar");
var _CardBottomBody = require("../Card/CardBottomBody");
var _CardFooter = require("../Card/CardFooter");
var _CardRoot = require("../Card/CardRoot");
var _CardTitleContainer = require("../Card/CardTitleContainer");
var _CardTopBody = require("../Card/CardTopBody");
var _Divider = require("../Divider");
var _Tag = require("../Tag");
var _ClubCard = require("./ClubCard.style");
var _TagList = require("./TagList");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var RECRUITMENT_STATUS = {
  primary: '모집예정',
  progress: '모집중',
  end: '모집마감'
};
function ClubCard(_ref) {
  var {
    width = '33rem',
    radius = '0.3125rem',
    hover = true,
    avatarShape = 'square',
    avatarSize = 'xl',
    avatarRadius = '0.3125rem',
    titlePartPaddingLeft = '1.25rem',
    footerHeight = '3.3rem',
    imageURL,
    imageName,
    title,
    type,
    status,
    tag,
    path
  } = _ref;
  var {
    goTo
  } = (0, _hooks.useRouter)();
  return (0, _react2.jsx)(_CardRoot.CardRoot, {
    width: width,
    radius: radius,
    hover: hover,
    onClick: () => goTo(path)
  }, (0, _react2.jsx)(_CardTopBody.CardTopBody, null, (0, _react2.jsx)(_Avatar.Avatar, {
    shape: avatarShape,
    size: avatarSize,
    radius: avatarRadius,
    imageURL: imageURL,
    imageName: imageName
  }), (0, _react2.jsx)(_CardTitleContainer.CardTitleContainer, {
    titlePartPaddingLeft: titlePartPaddingLeft,
    title: title,
    subTitle: type
  }), (0, _react2.jsx)("div", {
    css: _ClubCard.statusTag
  }, (0, _react2.jsx)(_Tag.Tag, {
    text: RECRUITMENT_STATUS[status],
    variant: status
  }))), (0, _react2.jsx)(_CardBottomBody.CardBottomBody, null), (0, _react2.jsx)(_Divider.Divider, null), (0, _react2.jsx)(_CardFooter.CardFooter, {
    footerHeight: footerHeight
  }, (0, _react2.jsx)(_TagList.TagList, {
    tag: tag
  })));
}