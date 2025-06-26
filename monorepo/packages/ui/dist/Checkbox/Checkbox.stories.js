"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xs = exports.s = exports.md = exports.lg = exports.default = exports.Subtle = exports.Solid = exports.Outline = exports.NoLabel = exports.Disabled = exports.DefaultCheckedButDisabled = exports.DefaultChecked = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require(".");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var meta = {
  title: 'Checkbox',
  component: _.Checkbox,
  parameters: {
    docs: {
      description: {
        component: 'Checkbox 컴포넌트입니다.'
      }
    }
  }
};
var _default = exports.default = meta;
var CheckboxTemplate = args => {
  return (0, _react2.jsx)(_.Checkbox.Root, args, (0, _react2.jsx)(_.Checkbox.HiddenInput, null), (0, _react2.jsx)(_.Checkbox.Control, null), (0, _react2.jsx)(_.Checkbox.Label, null, "Checkbox \uC785\uB2C8\uB2E4."));
};
var Outline = exports.Outline = CheckboxTemplate.bind({});
Outline.args = {
  variant: 'outline',
  size: 'md'
};
var Solid = exports.Solid = CheckboxTemplate.bind({});
Solid.args = {
  variant: 'solid',
  size: 'md'
};
var Subtle = exports.Subtle = CheckboxTemplate.bind({});
Subtle.args = {
  variant: 'subtle',
  size: 'md'
};
var xs = exports.xs = CheckboxTemplate.bind({});
xs.args = {
  size: 'xs'
};
var s = exports.s = CheckboxTemplate.bind({});
s.args = {
  size: 's'
};
var md = exports.md = CheckboxTemplate.bind({});
md.args = {
  size: 'md'
};
var lg = exports.lg = CheckboxTemplate.bind({});
lg.args = {
  size: 'lg'
};
var DefaultChecked = exports.DefaultChecked = CheckboxTemplate.bind({});
DefaultChecked.args = {
  defaultChecked: true,
  size: 'md'
};
var DefaultCheckedButDisabled = exports.DefaultCheckedButDisabled = CheckboxTemplate.bind({});
DefaultCheckedButDisabled.args = {
  defaultChecked: true,
  disabled: true,
  size: 'md'
};
var Disabled = exports.Disabled = CheckboxTemplate.bind({});
Disabled.args = {
  disabled: true,
  size: 'md'
};
var CheckboxNoLabelTemplate = args => {
  return (0, _react2.jsx)(_.Checkbox.Root, args, (0, _react2.jsx)(_.Checkbox.HiddenInput, null), (0, _react2.jsx)(_.Checkbox.Control, null));
};
var NoLabel = exports.NoLabel = CheckboxNoLabelTemplate.bind({});
NoLabel.args = {
  size: 'lg'
};