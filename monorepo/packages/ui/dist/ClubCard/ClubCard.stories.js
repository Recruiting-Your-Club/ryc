"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduled = exports.progress = exports.default = exports.End = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _ = require(".");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var meta = {
  title: '동아리 카드 컴포넌트',
  component: _.ClubCard,
  parameters: {
    docs: {
      description: {
        component: '동아리 카드 컴포넌트입니다.'
      }
    }
  },
  decorators: [Story => (0, _react2.jsx)(_reactRouterDom.MemoryRouter, null, (0, _react2.jsx)(Story, null))]
};
var _default = exports.default = meta;
var scheduled = exports.scheduled = {
  args: {
    imageURL: 'https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4',
    title: 'Recruting Your Club',
    type: '학술동아리',
    status: 'primary',
    tag: ['학술동아리', '코딩', '프로그래밍'],
    path: '/'
  }
};
var progress = exports.progress = {
  args: {
    imageURL: 'https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4',
    title: 'Recruting Your Club',
    type: '학술동아리',
    status: 'progress',
    tag: ['학술동아리', '코딩', '프로그래밍'],
    path: '/'
  }
};
var End = exports.End = {
  args: {
    imageURL: 'https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4',
    title: 'Recruting Your Club',
    type: '학술동아리',
    status: 'end',
    tag: ['학술동아리', '코딩', '프로그래밍'],
    path: '/'
  }
};