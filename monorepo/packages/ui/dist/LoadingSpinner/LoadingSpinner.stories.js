"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Spin = exports.Pulse = void 0;
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("@ssoc/styles"));
var _ = require(".");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var meta = {
  title: '스피너',
  component: _.SpinSpinner,
  parameters: {
    docs: {
      description: {
        component: '로딩스피너 컴포넌트입니다.'
      }
    }
  }
};
var _default = exports.default = meta;
var Spin = exports.Spin = {
  args: {}
};
var Pulse = exports.Pulse = {
  render: () => (0, _react2.jsx)(_.PulseSpinner, {
    color: _styles.default.colors.black
  })
};