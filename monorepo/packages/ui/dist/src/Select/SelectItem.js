"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectItem = SelectItem;
var _select_check = _interopRequireDefault(require("@ssoc/assets/images/select_check.svg"));
var _Select = require("./Select.styles");
var _SelectContext = require("./SelectContext");
var _react = require("@emotion/react");
var _excluded = ["children", "value", "disabled", "sx"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function SelectItem(_ref) {
  var {
      children,
      value: itemValue,
      disabled = false,
      sx
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  var {
    value,
    setValue,
    setOpen,
    setLabel
  } = (0, _SelectContext.useSelectContext)();
  var isSelected = value === itemValue;
  var handleSelect = () => {
    if (!disabled) {
      setValue(itemValue);
      setLabel(typeof children === 'string' ? children : '');
      setOpen(false);
    }
  };
  var handleKeyDown = event => {
    if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
      handleSelect();
    }
  };
  return (0, _react.jsx)("div", _extends({
    role: "option",
    "aria-selected": isSelected,
    onClick: handleSelect,
    onKeyDown: handleKeyDown,
    tabIndex: 0,
    css: [(0, _Select.s_selectItem)(), sx, process.env.NODE_ENV === "production" ? "" : ";label:SelectItem;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0SXRlbS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbURZIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0SXRlbS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB0eXBlIHsgSFRNTEF0dHJpYnV0ZXMsIEtleWJvYXJkRXZlbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IENoZWNrIGZyb20gJ0Bzc29jL2Fzc2V0cy9pbWFnZXMvc2VsZWN0X2NoZWNrLnN2Zyc7XG5cbmltcG9ydCB7IHNfc2VsZWN0SXRlbSwgc19zZWxlY3RJdGVtSW5kaWNhdG9yIH0gZnJvbSAnLi9TZWxlY3Quc3R5bGVzJztcbmltcG9ydCB7IHVzZVNlbGVjdENvbnRleHQgfSBmcm9tICcuL1NlbGVjdENvbnRleHQnO1xuXG4vKipcbiAqIFNlbGVjdEl0ZW0g7Lu07Y+s64SM7Yq4XG4gKi9cbmludGVyZmFjZSBTZWxlY3RJdGVtUHJvcHMgZXh0ZW5kcyBIVE1MQXR0cmlidXRlczxIVE1MRGl2RWxlbWVudD4ge1xuICAgIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XG4gICAgaGlnaGxpZ2h0PzogYm9vbGVhbjtcbiAgICBzeD86IENTU09iamVjdDtcbn1cblxuZnVuY3Rpb24gU2VsZWN0SXRlbSh7XG4gICAgY2hpbGRyZW4sXG4gICAgdmFsdWU6IGl0ZW1WYWx1ZSxcbiAgICBkaXNhYmxlZCA9IGZhbHNlLFxuICAgIHN4LFxuICAgIC4uLnByb3BzXG59OiBTZWxlY3RJdGVtUHJvcHMpIHtcbiAgICBjb25zdCB7IHZhbHVlLCBzZXRWYWx1ZSwgc2V0T3Blbiwgc2V0TGFiZWwgfSA9IHVzZVNlbGVjdENvbnRleHQoKTtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gdmFsdWUgPT09IGl0ZW1WYWx1ZTtcblxuICAgIGNvbnN0IGhhbmRsZVNlbGVjdCA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgICAgICAgc2V0VmFsdWUoaXRlbVZhbHVlKTtcbiAgICAgICAgICAgIHNldExhYmVsKHR5cGVvZiBjaGlsZHJlbiA9PT0gJ3N0cmluZycgPyBjaGlsZHJlbiA6ICcnKTsgLy9pdGVt7J2YIGNoaWxkcmVu7J20IE5vZGXsnbwg6rK97JqwIOyggOyepVhcbiAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vZGl27JeQIG9uQ2xpY2sg64us66Ck66m0IO2VhOyalFxuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGlmICghZGlzYWJsZWQgJiYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXkgPT09ICcgJykpIHtcbiAgICAgICAgICAgIGhhbmRsZVNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNTZWxlY3RlZH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlbGVjdH1cbiAgICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgY3NzPXtbc19zZWxlY3RJdGVtKCksIHN4XX1cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgPlxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAge2lzU2VsZWN0ZWQgJiYgPENoZWNrIGNzcz17c19zZWxlY3RJdGVtSW5kaWNhdG9yfSAvPn1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IHsgU2VsZWN0SXRlbSB9O1xuIl19 */"]
  }, props), children, isSelected && (0, _react.jsx)(_select_check.default, {
    css: _Select.s_selectItemIndicator
  }));
}