"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = void 0;
var _react = _interopRequireDefault(require("react"));
var _CheckboxControl = require("./CheckboxControl");
var _CheckboxHiddenInput = require("./CheckboxHiddenInput");
var _CheckboxLabel = require("./CheckboxLabel");
var _CheckboxRoot = require("./CheckboxRoot");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function BaseCheckbox(_ref) {
  var {
    variant,
    size,
    color,
    isChecked,
    onChange,
    defaultChecked = false,
    disabled = false
  } = _ref;
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_CheckboxRoot.CheckboxRoot, {
    variant: variant,
    size: size,
    color: color,
    isChecked: isChecked,
    onChange: onChange,
    defaultChecked: defaultChecked,
    disabled: disabled
  }, (0, _react2.jsx)(_CheckboxHiddenInput.CheckboxHiddenInput, null), (0, _react2.jsx)(_CheckboxControl.CheckboxControl, null), (0, _react2.jsx)(_CheckboxLabel.CheckboxLabel, null, "Checkbox \uC785\uB2C8\uB2E4.")));
}
var Checkbox = exports.Checkbox = Object.assign(BaseCheckbox, {
  Root: _CheckboxRoot.CheckboxRoot,
  HiddenInput: _CheckboxHiddenInput.CheckboxHiddenInput,
  Control: _CheckboxControl.CheckboxControl,
  Label: _CheckboxLabel.CheckboxLabel
});