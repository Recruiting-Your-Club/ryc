"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextColorPicker = TextColorPicker;
var _constants = require("@ssoc/constants");
var _react = _interopRequireWildcard(require("react"));
var _Editor = require("./Editor.style");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function TextColorPicker(_ref) {
  var {
    onChange
  } = _ref;
  var textColorRef = (0, _react.useRef)(null);
  var backColorRef = (0, _react.useRef)(null);
  var [isColorOpen, setIsColorOpen] = (0, _react.useState)(false);
  var [isBackOpen, setIsBackOpen] = (0, _react.useState)(false);
  var [selectedColor, setSelectedColor] = (0, _react.useState)(undefined);
  var [selectedBackColor, setSelectedBackColor] = (0, _react.useState)(undefined);
  (0, _react.useEffect)(() => {
    var handleClickOutside = e => {
      if (textColorRef.current && !textColorRef.current.contains(e.target)) {
        setIsColorOpen(false);
      }
      if (backColorRef.current && !backColorRef.current.contains(e.target)) {
        setIsBackOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (0, _react2.jsx)(_react.default.Fragment, null, _constants.textButtons.map(_ref2 => {
    var {
      text,
      Svg
    } = _ref2;
    var isColor = text === 'color';
    var ref = isColor ? textColorRef : backColorRef;
    var isOpen = isColor ? isColorOpen : isBackOpen;
    var setIsOpen = isColor ? setIsColorOpen : setIsBackOpen;
    var textColor = isColor ? selectedColor : selectedBackColor;
    var setTextColor = isColor ? setSelectedColor : setSelectedBackColor;
    return (0, _react2.jsx)("div", {
      css: _Editor.textButtonContainer,
      ref: ref,
      key: text
    }, (0, _react2.jsx)("button", {
      onClick: () => setIsOpen(prev => !prev),
      css: _Editor.perButtonCss
    }, (0, _react2.jsx)(Svg, {
      css: (0, _Editor.textColorSvgCss)(isOpen, textColor)
    })), isOpen && (0, _react2.jsx)("div", {
      css: _Editor.pickerContainer
    }, _constants.PICKER_COLORS.map(color => (0, _react2.jsx)("button", {
      key: color,
      css: (0, _Editor.perColorCss)(color, text),
      onClick: () => {
        onChange(text, color);
        setTextColor(color);
        setIsOpen(false);
      }
    }))));
  }));
}