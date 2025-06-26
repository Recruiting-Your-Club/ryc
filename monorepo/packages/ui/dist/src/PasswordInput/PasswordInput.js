"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordInput = PasswordInput;
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _passwordShow = _interopRequireDefault(require("@ssoc/assets/images/passwordShow.svg"));
var _passwordHide = _interopRequireDefault(require("@ssoc/assets/images/passwordHide.svg"));
var _Input = require("../Input");
var _PasswordInput = require("./PasswordInput.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PasswordInput(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var [isVisible, setIsVisible] = (0, _react.useState)(false);
  var handleVisible = () => {
    setIsVisible(!isVisible);
  };
  return (0, _react2.jsx)(_Input.Input, _extends({
    type: isVisible ? 'text' : 'password',
    endNode: (0, _react2.jsx)(_Button.Button, {
      size: "xs",
      variant: "transparent",
      onClick: handleVisible
    }, isVisible ? (0, _react2.jsx)(_passwordShow.default, {
      css: _PasswordInput.passwordIconContainer,
      "aria-label": "\uBE44\uBC00\uBC88\uD638 \uBCF4\uC774\uAE30"
    }) : (0, _react2.jsx)(_passwordHide.default, {
      css: _PasswordInput.passwordIconContainer,
      "aria-label": "\uBE44\uBC00\uBC88\uD638 \uC228\uAE30\uAE30"
    }))
  }, props));
}