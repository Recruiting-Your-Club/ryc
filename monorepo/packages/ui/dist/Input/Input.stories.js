"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lined = exports.errorInput = exports.default = exports.Primary = void 0;
var _react = _interopRequireDefault(require("react"));
var _Input = require("./Input");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var meta = {
  title: 'BaseInput',
  component: _Input.Input,
  parameters: {
    docs: {
      description: {
        component: 'BaseInput 컴포넌트입니다.'
      }
    }
  }
};
var _default = exports.default = meta;
var Primary = exports.Primary = {
  args: {
    type: 'text',
    variant: 'primary',
    placeholder: '텍스트를 입력해주세요',
    label: '라벨입니다.',
    helperText: 'helperText입니다.',
    startNode: (0, _react2.jsx)("div", null, "startNode"),
    endNode: (0, _react2.jsx)("div", null, "endNode")
  }
};
var lined = exports.lined = {
  args: {
    type: 'text',
    variant: 'lined',
    placeholder: '텍스트를 입력해주세요',
    label: '라벨입니다.',
    helperText: 'helperText입니다.',
    startNode: (0, _react2.jsx)("div", null, "startNode"),
    endNode: (0, _react2.jsx)("div", null, "endNode")
  }
};
var errorInput = exports.errorInput = {
  args: {
    type: 'text',
    variant: 'primary',
    placeholder: '텍스트를 입력해주세요',
    label: '비밀번호',
    helperText: '비밀번호가 일치하지 않습니다.',
    error: true
  }
};