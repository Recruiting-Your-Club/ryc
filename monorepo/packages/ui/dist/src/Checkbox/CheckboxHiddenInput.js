"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxHiddenInput = CheckboxHiddenInput;
var _react = _interopRequireDefault(require("react"));
var _Checkbox = require("./Checkbox.style");
var _CheckboxContext = require("./CheckboxContext");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CheckboxHiddenInput(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var {
    id,
    isChecked,
    onChange,
    defaultChecked,
    disabled
  } = (0, _CheckboxContext.useCheckboxContext)();
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("input", _extends({
    id: id,
    type: "checkbox",
    checked: isChecked,
    onChange: onChange,
    defaultChecked: defaultChecked,
    disabled: disabled,
    css: _Checkbox.hiddenInputCss
  }, props)));
}