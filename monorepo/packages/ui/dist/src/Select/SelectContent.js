"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectContent = SelectContent;
var _Select = require("./Select.styles");
var _SelectContext = require("./SelectContext");
var _react = require("@emotion/react");
var _excluded = ["children", "sx"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function SelectContent(_ref, forwardedRef) {
  var {
      children,
      sx
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  var {
    open,
    contentRef
  } = (0, _SelectContext.useSelectContext)();
  var ref = forwardedRef || contentRef;
  return (0, _react.jsx)("div", _extends({
    role: "listbox",
    ref: ref,
    css: [(0, _Select.s_selectContent)(open), sx, process.env.NODE_ENV === "production" ? "" : ";label:SelectContent;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0Q29udGVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJzQyIsImZpbGUiOiIuLi8uLi8uLi9zcmMvU2VsZWN0L1NlbGVjdENvbnRlbnQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDU1NPYmplY3QgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IEhUTUxBdHRyaWJ1dGVzLCBSZWFjdE5vZGUsIFJlZiB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgc19zZWxlY3RDb250ZW50IH0gZnJvbSAnLi9TZWxlY3Quc3R5bGVzJztcbmltcG9ydCB7IHVzZVNlbGVjdENvbnRleHQgfSBmcm9tICcuL1NlbGVjdENvbnRleHQnO1xuXG4vKipcbiAqIFNlbGVjdENvbnRlbnQg7Lu07Y+s64SM7Yq4XG4gKi9cbmludGVyZmFjZSBTZWxlY3RDb250ZW50UHJvcHMgZXh0ZW5kcyBIVE1MQXR0cmlidXRlczxIVE1MRGl2RWxlbWVudD4ge1xuICAgIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG4gICAgc3g/OiBDU1NPYmplY3Q7XG59XG5cbmZ1bmN0aW9uIFNlbGVjdENvbnRlbnQoXG4gICAgeyBjaGlsZHJlbiwgc3gsIC4uLnByb3BzIH06IFNlbGVjdENvbnRlbnRQcm9wcyxcbiAgICBmb3J3YXJkZWRSZWY6IFJlZjxIVE1MRGl2RWxlbWVudD4sXG4pIHtcbiAgICBjb25zdCB7IG9wZW4sIGNvbnRlbnRSZWYgfSA9IHVzZVNlbGVjdENvbnRleHQoKTtcblxuICAgIGNvbnN0IHJlZiA9IGZvcndhcmRlZFJlZiB8fCBjb250ZW50UmVmO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByb2xlPVwibGlzdGJveFwiIHJlZj17cmVmfSBjc3M9e1tzX3NlbGVjdENvbnRlbnQob3BlbiksIHN4XX0gey4uLnByb3BzfT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IHsgU2VsZWN0Q29udGVudCB9O1xuIl19 */"]
  }, props), children);
}