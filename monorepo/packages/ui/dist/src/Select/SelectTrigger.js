"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectTrigger = SelectTrigger;
var _downArrow = _interopRequireDefault(require("@ssoc/assets/images/downArrow.svg"));
var _Select = require("./Select.styles");
var _SelectContext = require("./SelectContext");
var _react = require("@emotion/react");
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
  return (0, _react.jsx)("button", _extends({
    css: [_Select.s_selectTrigger, sx, process.env.NODE_ENV === "production" ? "" : ";label:SelectTrigger;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0VHJpZ2dlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJZIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0VHJpZ2dlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB0eXBlIHsgQnV0dG9uSFRNTEF0dHJpYnV0ZXMsIFJlYWN0Tm9kZSwgUmVmIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG93bkFycm93IGZyb20gJ0Bzc29jL2Fzc2V0cy9pbWFnZXMvZG93bkFycm93LnN2Zyc7XG5cbmltcG9ydCB7IHNfc2VsZWN0VHJpZ2dlciB9IGZyb20gJy4vU2VsZWN0LnN0eWxlcyc7XG5pbXBvcnQgeyB1c2VTZWxlY3RDb250ZXh0IH0gZnJvbSAnLi9TZWxlY3RDb250ZXh0JztcblxuaW50ZXJmYWNlIFNlbGVjdFRyaWdnZXJQcm9wcyBleHRlbmRzIEJ1dHRvbkhUTUxBdHRyaWJ1dGVzPEhUTUxCdXR0b25FbGVtZW50PiB7XG4gICAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgICBzeD86IENTU09iamVjdDtcbn1cblxuZnVuY3Rpb24gU2VsZWN0VHJpZ2dlcihcbiAgICB7IGNoaWxkcmVuLCBzeCwgLi4ucHJvcHMgfTogU2VsZWN0VHJpZ2dlclByb3BzLFxuICAgIGZvcndhcmRlZFJlZjogUmVmPEhUTUxCdXR0b25FbGVtZW50Pixcbikge1xuICAgIGNvbnN0IHsgb3Blbiwgc2V0T3BlbiwgdHJpZ2dlclJlZiB9ID0gdXNlU2VsZWN0Q29udGV4dCgpO1xuXG4gICAgY29uc3QgcmVmID0gZm9yd2FyZGVkUmVmIHx8IHRyaWdnZXJSZWY7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjc3M9e1tzX3NlbGVjdFRyaWdnZXIsIHN4XX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKCFvcGVuKX1cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgPlxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgPERvd25BcnJvdyAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICApO1xufVxuXG5leHBvcnQgeyBTZWxlY3RUcmlnZ2VyIH07XG4iXX0= */"],
    type: "button",
    ref: ref,
    onClick: () => setOpen(!open)
  }, props), children, (0, _react.jsx)(_downArrow.default, null));
}