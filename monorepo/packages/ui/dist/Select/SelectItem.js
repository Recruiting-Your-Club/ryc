"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectItem = SelectItem;
var _react = _interopRequireDefault(require("react"));
var _SelectContext = require("./SelectContext");
var _Select = require("./Select.styles");
var _select_check = _interopRequireDefault(require("@ssoc/assets/images/select_check.svg"));
var _react2 = require("@emotion/react");
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
  return (0, _react2.jsx)("div", _extends({
    role: "option",
    "aria-selected": isSelected,
    onClick: handleSelect,
    onKeyDown: handleKeyDown,
    tabIndex: 0,
    css: [(0, _Select.s_selectItem)(), sx, process.env.NODE_ENV === "production" ? "" : ";label:SelectItem;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0SXRlbS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0RZIiwiZmlsZSI6Ii4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0SXRlbS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB0eXBlIHsgSFRNTEF0dHJpYnV0ZXMsIEtleWJvYXJkRXZlbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlbGVjdENvbnRleHQgfSBmcm9tICcuL1NlbGVjdENvbnRleHQnO1xuaW1wb3J0IHsgc19zZWxlY3RJdGVtLCBzX3NlbGVjdEl0ZW1JbmRpY2F0b3IgfSBmcm9tICcuL1NlbGVjdC5zdHlsZXMnO1xuaW1wb3J0IENoZWNrIGZyb20gJ0Bzc29jL2Fzc2V0cy9pbWFnZXMvc2VsZWN0X2NoZWNrLnN2Zyc7XG5cbi8qKlxuICogU2VsZWN0SXRlbSDsu7Ttj6zrhIztirhcbiAqL1xuaW50ZXJmYWNlIFNlbGVjdEl0ZW1Qcm9wcyBleHRlbmRzIEhUTUxBdHRyaWJ1dGVzPEhUTUxEaXZFbGVtZW50PiB7XG4gICAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgICBoaWdobGlnaHQ/OiBib29sZWFuO1xuICAgIHN4PzogQ1NTT2JqZWN0O1xufVxuXG5mdW5jdGlvbiBTZWxlY3RJdGVtKHtcbiAgICBjaGlsZHJlbixcbiAgICB2YWx1ZTogaXRlbVZhbHVlLFxuICAgIGRpc2FibGVkID0gZmFsc2UsXG4gICAgc3gsXG4gICAgLi4ucHJvcHNcbn06IFNlbGVjdEl0ZW1Qcm9wcykge1xuICAgIGNvbnN0IHsgdmFsdWUsIHNldFZhbHVlLCBzZXRPcGVuLCBzZXRMYWJlbCB9ID0gdXNlU2VsZWN0Q29udGV4dCgpO1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB2YWx1ZSA9PT0gaXRlbVZhbHVlO1xuXG4gICAgY29uc3QgaGFuZGxlU2VsZWN0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICAgICAgICBzZXRWYWx1ZShpdGVtVmFsdWUpO1xuICAgICAgICAgICAgc2V0TGFiZWwodHlwZW9mIGNoaWxkcmVuID09PSAnc3RyaW5nJyA/IGNoaWxkcmVuIDogJycpOyAvL2l0ZW3snZggY2hpbGRyZW7snbQgTm9kZeydvCDqsr3smrAg7KCA7J6lWFxuICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9kaXbsl5Agb25DbGljayDri6zroKTrqbQg7ZWE7JqUXG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiAoZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleSA9PT0gJyAnKSkge1xuICAgICAgICAgICAgaGFuZGxlU2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc1NlbGVjdGVkfVxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgICBjc3M9e1tzX3NlbGVjdEl0ZW0oKSwgc3hdfVxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICA+XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICB7aXNTZWxlY3RlZCAmJiA8Q2hlY2sgY3NzPXtzX3NlbGVjdEl0ZW1JbmRpY2F0b3J9IC8+fVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgeyBTZWxlY3RJdGVtIH07XG4iXX0= */"]
  }, props), children, isSelected && (0, _react2.jsx)(_select_check.default, {
    css: _Select.s_selectItemIndicator
  }));
}