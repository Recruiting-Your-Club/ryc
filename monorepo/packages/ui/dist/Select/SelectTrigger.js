"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectTrigger = SelectTrigger;
var _react = _interopRequireDefault(require("react"));
var _SelectContext = require("./SelectContext");
var _Select = require("./Select.styles");
var _downArrow = _interopRequireDefault(require("@ssoc/assets/images/downArrow.svg"));
var _react2 = require("@emotion/react");
var _excluded = ["children", "sx"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function SelectTrigger(_ref, forwardedRef) {
  var {
      children,
      sx
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  var {
    open,
    setOpen,
    triggerRef
  } = (0, _SelectContext.useSelectContext)();
  var ref = forwardedRef || triggerRef;
  return (0, _react2.jsx)("button", _extends({
    css: [_Select.s_selectTrigger, sx, process.env.NODE_ENV === "production" ? "" : ";label:SelectTrigger;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0VHJpZ2dlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JZIiwiZmlsZSI6Ii4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0VHJpZ2dlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB0eXBlIHsgQnV0dG9uSFRNTEF0dHJpYnV0ZXMsIFJlYWN0Tm9kZSwgUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYsIHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWxlY3RDb250ZXh0IH0gZnJvbSAnLi9TZWxlY3RDb250ZXh0JztcbmltcG9ydCB7IHNfc2VsZWN0VHJpZ2dlciB9IGZyb20gJy4vU2VsZWN0LnN0eWxlcyc7XG5pbXBvcnQgRG93bkFycm93IGZyb20gJ0Bzc29jL2Fzc2V0cy9pbWFnZXMvZG93bkFycm93LnN2Zyc7XG5cbmludGVyZmFjZSBTZWxlY3RUcmlnZ2VyUHJvcHMgZXh0ZW5kcyBCdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4ge1xuICAgIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG4gICAgc3g/OiBDU1NPYmplY3Q7XG59XG5cbmZ1bmN0aW9uIFNlbGVjdFRyaWdnZXIoXG4gICAgeyBjaGlsZHJlbiwgc3gsIC4uLnByb3BzIH06IFNlbGVjdFRyaWdnZXJQcm9wcyxcbiAgICBmb3J3YXJkZWRSZWY6IFJlZjxIVE1MQnV0dG9uRWxlbWVudD4sXG4pIHtcbiAgICBjb25zdCB7IG9wZW4sIHNldE9wZW4sIHRyaWdnZXJSZWYgfSA9IHVzZVNlbGVjdENvbnRleHQoKTtcblxuICAgIGNvbnN0IHJlZiA9IGZvcndhcmRlZFJlZiB8fCB0cmlnZ2VyUmVmO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY3NzPXtbc19zZWxlY3RUcmlnZ2VyLCBzeF19XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0T3Blbighb3Blbil9XG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgID5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDxEb3duQXJyb3cgLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgKTtcbn1cblxuZXhwb3J0IHsgU2VsZWN0VHJpZ2dlciB9O1xuIl19 */"],
    type: "button",
    ref: ref,
    onClick: () => setOpen(!open)
  }, props), children, (0, _react2.jsx)(_downArrow.default, null));
}