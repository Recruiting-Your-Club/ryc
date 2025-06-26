"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PrimaryHover = exports.Primary = exports.NoDivider = exports.AvatarAdded = void 0;
var _react = _interopRequireDefault(require("react"));
var _Avatar = require("../Avatar");
var _TagList = require("../ClubCard/TagList");
var _Divider = require("../Divider");
var _CardBottomBody = require("./CardBottomBody");
var _CardFooter = require("./CardFooter");
var _CardRoot = require("./CardRoot");
var _CardTest = require("./CardTest");
var _CardTitleContainer = require("./CardTitleContainer");
var _CardTopBody = require("./CardTopBody");
var _DescriptionText = require("./DescriptionText");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var meta = {
  title: '기본카드',
  component: _CardTest.Card,
  parameters: {
    docs: {
      description: {
        component: '카드 컴포넌트입니다.'
      }
    }
  }
};
var _default = exports.default = meta;
var PrimaryTemplate = _ref => {
  var {
    width = '30rem',
    radius = '0.3125rem',
    hover,
    titlePartPaddingLeft,
    footerHeight = '3.75rem',
    title = 'EN#(Enjoy C#)',
    subTitle = '학술동아리',
    description = '모집기간 : 2025.01.25 - 2025.01.26'
  } = _ref;
  return (0, _react2.jsx)(_CardRoot.CardRoot, {
    width: width,
    radius: radius,
    hover: hover
  }, (0, _react2.jsx)(_CardTopBody.CardTopBody, null, (0, _react2.jsx)(_CardTitleContainer.CardTitleContainer, {
    titlePartPaddingLeft: titlePartPaddingLeft,
    title: title,
    subTitle: subTitle
  })), (0, _react2.jsx)(_CardBottomBody.CardBottomBody, null, (0, _react2.jsx)(_DescriptionText.DescriptionText, {
    description: description
  })), (0, _react2.jsx)(_Divider.Divider, null), (0, _react2.jsx)(_CardFooter.CardFooter, {
    footerHeight: footerHeight
  }, (0, _react2.jsx)(_TagList.TagList, {
    tag: ['코딩', '프로그래밍', 'IT']
  })));
};
var Primary = exports.Primary = PrimaryTemplate.bind({});
var PrimaryHover = exports.PrimaryHover = PrimaryTemplate.bind({});
PrimaryHover.args = {
  hover: true
};
var AvatarTemplate = _ref2 => {
  var {
    width = '30rem',
    radius = '0.3125rem',
    hover,
    avatarShape,
    avatarSize = 'xl',
    avatarRadius = '0.3125rem',
    titlePartPaddingLeft,
    footerHeight = '3.75rem',
    imageURL,
    imageName,
    title = 'EN#(Enjoy C#)',
    subTitle = '학술동아리',
    description = '모집기간 : 2025.01.25 - 2025.01.26'
  } = _ref2;
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
  }, (0, _react2.jsx)(_TagList.TagList, {
    tag: ['코딩', '프로그래밍', 'IT']
  })));
};
var AvatarAdded = exports.AvatarAdded = AvatarTemplate.bind({});
AvatarAdded.args = {
  hover: true,
  titlePartPaddingLeft: '1.25rem',
  avatarShape: 'square'
};
var NoDividerTemplate = _ref3 => {
  var {
    width = '23rem',
    radius = '0.3125rem',
    hover,
    avatarShape,
    avatarSize = 'xl',
    avatarRadius = '0.3125rem',
    titlePartPaddingLeft,
    imageURL,
    imageName,
    title = 'EN#(Enjoy C#)',
    subTitle = '학술동아리',
    description = '💡 IT 동아리 EN# 신규 멤버 모집! 💡\n 코딩, 개발, 협업에 관심 있는 분들을 찾습니다.\n 함께 배우고 성장하며 멋진 프로젝트를 만들어봐요!\n 경험이 없어도 환영합니다. 지금 함께하세요! 🚀💻'
  } = _ref3;
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
  })));
};
var NoDivider = exports.NoDivider = NoDividerTemplate.bind({});
NoDivider.args = {
  hover: true,
  titlePartPaddingLeft: '1.25rem',
  avatarShape: 'square'
};