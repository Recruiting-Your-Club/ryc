"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxRoot = CheckboxRoot;
var _react = _interopRequireWildcard(require("react"));
var _Checkbox = require("./Checkbox.style");
var _CheckboxContext = require("./CheckboxContext");
var _react2 = require("@emotion/react");
var _excluded = ["variant", "size", "color", "children", "onChange", "isChecked", "defaultChecked", "disabled", "sx"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function CheckboxRoot(_ref) {
  var {
      variant,
      size,
      color,
      children,
      onChange,
      isChecked: externalChecked,
      defaultChecked = false,
      disabled = false,
      sx
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  var id = (0, _react.useId)();
  var [checked, setChecked] = (0, _react.useState)(defaultChecked);
  var isChecked = externalChecked !== null && externalChecked !== void 0 ? externalChecked : checked;
  var onChangeInner = () => {
    setChecked(prev => !prev);
  };
  var changeHandler = () => {
    if (disabled) return;
    (onChange !== null && onChange !== void 0 ? onChange : onChangeInner)();
  };
  var contextValue = (0, _react.useMemo)(() => ({
    id: id,
    variant,
    size,
    color,
    isChecked: isChecked,
    onChange: changeHandler,
    defaultChecked,
    disabled
  }), [variant, size, color, isChecked, defaultChecked, disabled]);
  return (0, _react2.jsx)(_CheckboxContext.CheckboxContext.Provider, {
    value: contextValue
  }, (0, _react2.jsx)("div", {
    css: [_Checkbox.rootContainer, sx, process.env.NODE_ENV === "production" ? "" : ";label:CheckboxRoot;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DaGVja2JveC9DaGVja2JveFJvb3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlFaUIiLCJmaWxlIjoiLi4vLi4vc3JjL0NoZWNrYm94L0NoZWNrYm94Um9vdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyBJbnB1dEhUTUxBdHRyaWJ1dGVzLCB1c2VJZCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByb290Q29udGFpbmVyIH0gZnJvbSAnLi9DaGVja2JveC5zdHlsZSc7XG5pbXBvcnQgeyBDaGVja2JveENvbnRleHQgfSBmcm9tICcuL0NoZWNrYm94Q29udGV4dCc7XG5cbmV4cG9ydCB0eXBlIENoZWNrYm94U2l6ZSA9ICd4cycgfCAncycgfCAnbWQnIHwgJ2xnJztcbmV4cG9ydCB0eXBlIENoZWNrYm94VmFyaWFudCA9ICdvdXRsaW5lJyB8ICdzb2xpZCcgfCAnc3VidGxlJztcbmV4cG9ydCB0eXBlIENoZWNrYm94Q29sb3IgPSAnZGVmYXVsdCcgfCAnZ3JheScgfCAncmVkJyB8ICdibGFjayc7XG5cbmludGVyZmFjZSBDaGVja2JveFJvb3RQcm9wcyB7XG4gICAgdmFyaWFudD86IENoZWNrYm94VmFyaWFudDtcbiAgICBzaXplPzogQ2hlY2tib3hTaXplO1xuICAgIGNvbG9yPzogQ2hlY2tib3hDb2xvcjtcbiAgICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgICBvbkNoYW5nZT86ICgpID0+IHZvaWQ7XG4gICAgaXNDaGVja2VkPzogYm9vbGVhbjtcbiAgICBkZWZhdWx0Q2hlY2tlZD86IGJvb2xlYW47XG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICAgIHN4PzogQ1NTT2JqZWN0O1xufVxuXG5mdW5jdGlvbiBDaGVja2JveFJvb3Qoe1xuICAgIHZhcmlhbnQsXG4gICAgc2l6ZSxcbiAgICBjb2xvcixcbiAgICBjaGlsZHJlbixcbiAgICBvbkNoYW5nZSxcbiAgICBpc0NoZWNrZWQ6IGV4dGVybmFsQ2hlY2tlZCxcbiAgICBkZWZhdWx0Q2hlY2tlZCA9IGZhbHNlLFxuICAgIGRpc2FibGVkID0gZmFsc2UsXG4gICAgc3gsXG4gICAgLi4ucHJvcHNcbn06IENoZWNrYm94Um9vdFByb3BzKSB7XG4gICAgLy8gcHJvcCBkZXN0cnVjdGlvblxuICAgIC8vIGxpYiBob29rc1xuICAgIGNvbnN0IGlkID0gdXNlSWQoKTsgLy8gSGlkZGVuSW5wdXTqs7wgTGFiZWwg7Jew6rKw7J2EIOychO2VtCDsnoTsnZgg7JWE7J2065SUIOyDneyEsVxuXG4gICAgLy8gc3RhdGUsIHJlZiwgcXVlcnlzdHJpbmcgaG9va3NcbiAgICBjb25zdCBbY2hlY2tlZCwgc2V0Q2hlY2tlZF0gPSB1c2VTdGF0ZShkZWZhdWx0Q2hlY2tlZCk7XG5cbiAgICAvLyBmb3JtIGhvb2tzXG4gICAgLy8gcXVlcnkgaG9va3NcbiAgICAvLyBlZmZlY3RzXG5cbiAgICAvLyBoYW5kbGVyc1xuICAgIGNvbnN0IGlzQ2hlY2tlZCA9IGV4dGVybmFsQ2hlY2tlZCA/PyBjaGVja2VkO1xuXG4gICAgY29uc3Qgb25DaGFuZ2VJbm5lciA9ICgpID0+IHtcbiAgICAgICAgc2V0Q2hlY2tlZCgocHJldikgPT4gIXByZXYpO1xuICAgIH07XG5cbiAgICBjb25zdCBjaGFuZ2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgKG9uQ2hhbmdlID8/IG9uQ2hhbmdlSW5uZXIpKCk7XG4gICAgfTtcblxuICAgIC8vIGNhbGN1bGF0ZWQgdmFsdWVzXG4gICAgY29uc3QgY29udGV4dFZhbHVlID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gKHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIHZhcmlhbnQsXG4gICAgICAgICAgICBzaXplLFxuICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICBpc0NoZWNrZWQ6IGlzQ2hlY2tlZCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBjaGFuZ2VIYW5kbGVyLFxuICAgICAgICAgICAgZGVmYXVsdENoZWNrZWQsXG4gICAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgfSksXG4gICAgICAgIFt2YXJpYW50LCBzaXplLCBjb2xvciwgaXNDaGVja2VkLCBkZWZhdWx0Q2hlY2tlZCwgZGlzYWJsZWRdLFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Q2hlY2tib3hDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtjb250ZXh0VmFsdWV9PlxuICAgICAgICAgICAgPGRpdiBjc3M9e1tyb290Q29udGFpbmVyLCBzeF19PntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAgPC9DaGVja2JveENvbnRleHQuUHJvdmlkZXI+XG4gICAgKTtcbn1cbmV4cG9ydCB7IENoZWNrYm94Um9vdCB9O1xuIl19 */"]
  }, children));
}