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
    css: [_Checkbox.rootContainer, sx, process.env.NODE_ENV === "production" ? "" : ";label:CheckboxRoot;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DaGVja2JveC9DaGVja2JveFJvb3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBFaUIiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0NoZWNrYm94L0NoZWNrYm94Um9vdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VJZCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHJvb3RDb250YWluZXIgfSBmcm9tICcuL0NoZWNrYm94LnN0eWxlJztcbmltcG9ydCB7IENoZWNrYm94Q29udGV4dCB9IGZyb20gJy4vQ2hlY2tib3hDb250ZXh0JztcblxuZXhwb3J0IHR5cGUgQ2hlY2tib3hTaXplID0gJ3hzJyB8ICdzJyB8ICdtZCcgfCAnbGcnO1xuZXhwb3J0IHR5cGUgQ2hlY2tib3hWYXJpYW50ID0gJ291dGxpbmUnIHwgJ3NvbGlkJyB8ICdzdWJ0bGUnO1xuZXhwb3J0IHR5cGUgQ2hlY2tib3hDb2xvciA9ICdkZWZhdWx0JyB8ICdncmF5JyB8ICdyZWQnIHwgJ2JsYWNrJztcblxuaW50ZXJmYWNlIENoZWNrYm94Um9vdFByb3BzIHtcbiAgICB2YXJpYW50PzogQ2hlY2tib3hWYXJpYW50O1xuICAgIHNpemU/OiBDaGVja2JveFNpemU7XG4gICAgY29sb3I/OiBDaGVja2JveENvbG9yO1xuICAgIGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlO1xuICAgIG9uQ2hhbmdlPzogKCkgPT4gdm9pZDtcbiAgICBpc0NoZWNrZWQ/OiBib29sZWFuO1xuICAgIGRlZmF1bHRDaGVja2VkPzogYm9vbGVhbjtcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XG4gICAgc3g/OiBDU1NPYmplY3Q7XG59XG5cbmZ1bmN0aW9uIENoZWNrYm94Um9vdCh7XG4gICAgdmFyaWFudCxcbiAgICBzaXplLFxuICAgIGNvbG9yLFxuICAgIGNoaWxkcmVuLFxuICAgIG9uQ2hhbmdlLFxuICAgIGlzQ2hlY2tlZDogZXh0ZXJuYWxDaGVja2VkLFxuICAgIGRlZmF1bHRDaGVja2VkID0gZmFsc2UsXG4gICAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgICBzeCxcbiAgICAuLi5wcm9wc1xufTogQ2hlY2tib3hSb290UHJvcHMpIHtcbiAgICAvLyBwcm9wIGRlc3RwYWNrYWdlcy9lc2xpbnRydWN0aW9uXG4gICAgLy8gbGliIGhvb2tzXG4gICAgY29uc3QgaWQgPSB1c2VJZCgpOyAvLyBIaWRkZW5JbnB1dOqzvCBMYWJlbCDsl7DqsrDsnYQg7JyE7ZW0IOyehOydmCDslYTsnbTrlJQg7IOd7ISxXG5cbiAgICAvLyBzdGF0ZSwgcmVmLCBxdWVyeXN0cmluZyBob29rc1xuICAgIGNvbnN0IFtjaGVja2VkLCBzZXRDaGVja2VkXSA9IHVzZVN0YXRlKGRlZmF1bHRDaGVja2VkKTtcblxuICAgIC8vIGZvcm0gaG9va3NcbiAgICAvLyBxdWVyeSBob29rc1xuICAgIC8vIGVmZmVjdHNcblxuICAgIC8vIGhhbmRsZXJzXG4gICAgY29uc3QgaXNDaGVja2VkID0gZXh0ZXJuYWxDaGVja2VkID8/IGNoZWNrZWQ7XG5cbiAgICBjb25zdCBvbkNoYW5nZUlubmVyID0gKCkgPT4ge1xuICAgICAgICBzZXRDaGVja2VkKChwcmV2KSA9PiAhcHJldik7XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAob25DaGFuZ2UgPz8gb25DaGFuZ2VJbm5lcikoKTtcbiAgICB9O1xuXG4gICAgLy8gY2FsY3VsYXRlZCB2YWx1ZXNcbiAgICBjb25zdCBjb250ZXh0VmFsdWUgPSB1c2VNZW1vKFxuICAgICAgICAoKSA9PiAoe1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgdmFyaWFudCxcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgIGlzQ2hlY2tlZDogaXNDaGVja2VkLFxuICAgICAgICAgICAgb25DaGFuZ2U6IGNoYW5nZUhhbmRsZXIsXG4gICAgICAgICAgICBkZWZhdWx0Q2hlY2tlZCxcbiAgICAgICAgICAgIGRpc2FibGVkLFxuICAgICAgICB9KSxcbiAgICAgICAgW3ZhcmlhbnQsIHNpemUsIGNvbG9yLCBpc0NoZWNrZWQsIGRlZmF1bHRDaGVja2VkLCBkaXNhYmxlZF0sXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxDaGVja2JveENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2NvbnRleHRWYWx1ZX0+XG4gICAgICAgICAgICA8ZGl2IGNzcz17W3Jvb3RDb250YWluZXIsIHN4XX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L0NoZWNrYm94Q29udGV4dC5Qcm92aWRlcj5cbiAgICApO1xufVxuZXhwb3J0IHsgQ2hlY2tib3hSb290IH07XG4iXX0= */"]
  }, children));
}