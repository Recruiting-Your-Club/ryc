"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;
var _react = _interopRequireWildcard(require("react"));
var _SelectContext = require("./SelectContext");
var _Select = require("./Select.styles");
var _SelectContent = require("./SelectContent");
var _SelectGroup = require("./SelectGroup");
var _SelectItem = require("./SelectItem");
var _SelectLabel = require("./SelectLabel");
var _SelectSeparator = require("./SelectSeparator");
var _SelectTrigger = require("./SelectTrigger");
var _SelectValue = require("./SelectValue");
var _hooks = require("@ssoc/hooks");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function SelectRoot(_ref) {
  var {
    children,
    value: controlledValue,
    onValueChange,
    size = 'md',
    sx
  } = _ref;
  var [open, setOpen] = (0, _react.useState)(false);
  var [label, setLabel] = (0, _react.useState)('');
  var [internalValue, setInternalValue] = (0, _react.useState)(controlledValue || '');
  var triggerRef = (0, _react.useRef)(null);
  var contentRef = (0, _react.useRef)(null);
  var value = controlledValue !== null && controlledValue !== void 0 ? controlledValue : internalValue;
  var setValue = newValue => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };
  (0, _hooks.useClickOutside)([triggerRef, contentRef], () => setOpen(false));
  var contextValue = (0, _react.useMemo)(() => ({
    open,
    setOpen,
    value,
    setValue,
    label,
    setLabel,
    triggerRef,
    contentRef
  }), [open, value, label]);
  return (0, _react2.jsx)(_SelectContext.SelectContext.Provider, {
    value: contextValue
  }, (0, _react2.jsx)("div", {
    css: [(0, _Select.s_size)(size), _Select.s_select, sx, process.env.NODE_ENV === "production" ? "" : ";label:SelectRoot;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyRGlCIiwiZmlsZSI6Ii4uLy4uL3NyYy9TZWxlY3QvU2VsZWN0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQnV0dG9uSFRNTEF0dHJpYnV0ZXMsIEhUTUxBdHRyaWJ1dGVzLCBLZXlib2FyZEV2ZW50LCBSZWFjdE5vZGUsIFJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTZWxlY3RDb250ZXh0LCB1c2VTZWxlY3RDb250ZXh0IH0gZnJvbSAnLi9TZWxlY3RDb250ZXh0JztcbmltcG9ydCB0eXBlIHsgQ1NTT2JqZWN0IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgc19zZWxlY3QsIHNfc2l6ZSB9IGZyb20gJy4vU2VsZWN0LnN0eWxlcyc7XG5pbXBvcnQgeyBTZWxlY3RDb250ZW50IH0gZnJvbSAnLi9TZWxlY3RDb250ZW50JztcbmltcG9ydCB7IFNlbGVjdEdyb3VwIH0gZnJvbSAnLi9TZWxlY3RHcm91cCc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAnLi9TZWxlY3RJdGVtJztcbmltcG9ydCB7IFNlbGVjdExhYmVsIH0gZnJvbSAnLi9TZWxlY3RMYWJlbCc7XG5pbXBvcnQgeyBTZWxlY3RTZXBhcmF0b3IgfSBmcm9tICcuL1NlbGVjdFNlcGFyYXRvcic7XG5pbXBvcnQgeyBTZWxlY3RUcmlnZ2VyIH0gZnJvbSAnLi9TZWxlY3RUcmlnZ2VyJztcbmltcG9ydCB7IFNlbGVjdFZhbHVlIH0gZnJvbSAnLi9TZWxlY3RWYWx1ZSc7XG5pbXBvcnQgeyB1c2VDbGlja091dHNpZGUgfSBmcm9tICdAc3NvYy9ob29rcyc7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdFNpemUgPSAneHMnIHwgJ3MnIHwgJ21kJyB8ICdsZycgfCAneGwnIHwgJ2Z1bGwnO1xuXG4vKipcbiAqIFNlbGVjdCDro6jtirgg7Lu07Y+s64SM7Yq4XG4gKi9cbmludGVyZmFjZSBTZWxlY3RQcm9wcyB7XG4gICAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgICBzaXplPzogU2VsZWN0U2l6ZTtcbiAgICBvblZhbHVlQ2hhbmdlPzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgc3g/OiBDU1NPYmplY3Q7XG59XG5cbmZ1bmN0aW9uIFNlbGVjdFJvb3Qoe1xuICAgIGNoaWxkcmVuLFxuICAgIHZhbHVlOiBjb250cm9sbGVkVmFsdWUsXG4gICAgb25WYWx1ZUNoYW5nZSxcbiAgICBzaXplID0gJ21kJyxcbiAgICBzeCxcbn06IFNlbGVjdFByb3BzKSB7XG4gICAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtsYWJlbCwgc2V0TGFiZWxdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtpbnRlcm5hbFZhbHVlLCBzZXRJbnRlcm5hbFZhbHVlXSA9IHVzZVN0YXRlKGNvbnRyb2xsZWRWYWx1ZSB8fCAnJyk7XG4gICAgY29uc3QgdHJpZ2dlclJlZiA9IHVzZVJlZjxIVE1MQnV0dG9uRWxlbWVudD4obnVsbCk7XG4gICAgY29uc3QgY29udGVudFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2xsZWRWYWx1ZSA/PyBpbnRlcm5hbFZhbHVlO1xuXG4gICAgY29uc3Qgc2V0VmFsdWUgPSAobmV3VmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAob25WYWx1ZUNoYW5nZSkge1xuICAgICAgICAgICAgb25WYWx1ZUNoYW5nZShuZXdWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRJbnRlcm5hbFZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB1c2VDbGlja091dHNpZGUoW3RyaWdnZXJSZWYsIGNvbnRlbnRSZWZdLCAoKSA9PiBzZXRPcGVuKGZhbHNlKSk7XG5cbiAgICBjb25zdCBjb250ZXh0VmFsdWUgPSB1c2VNZW1vKFxuICAgICAgICAoKSA9PiAoeyBvcGVuLCBzZXRPcGVuLCB2YWx1ZSwgc2V0VmFsdWUsIGxhYmVsLCBzZXRMYWJlbCwgdHJpZ2dlclJlZiwgY29udGVudFJlZiB9KSxcbiAgICAgICAgW29wZW4sIHZhbHVlLCBsYWJlbF0sXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTZWxlY3RDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtjb250ZXh0VmFsdWV9PlxuICAgICAgICAgICAgPGRpdiBjc3M9e1tzX3NpemUoc2l6ZSksIHNfc2VsZWN0LCBzeF19PntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAgPC9TZWxlY3RDb250ZXh0LlByb3ZpZGVyPlxuICAgICk7XG59XG5cbmNvbnN0IFNlbGVjdCA9IE9iamVjdC5hc3NpZ24oU2VsZWN0Um9vdCwge1xuICAgIFRyaWdnZXI6IFNlbGVjdFRyaWdnZXIsXG4gICAgVmFsdWU6IFNlbGVjdFZhbHVlLFxuICAgIENvbnRlbnQ6IFNlbGVjdENvbnRlbnQsXG4gICAgR3JvdXA6IFNlbGVjdEdyb3VwLFxuICAgIExhYmVsOiBTZWxlY3RMYWJlbCxcbiAgICBJdGVtOiBTZWxlY3RJdGVtLFxuICAgIFNlcGFyYXRvcjogU2VsZWN0U2VwYXJhdG9yLFxufSk7XG5cbmV4cG9ydCB7IFNlbGVjdCB9O1xuIl19 */"]
  }, children));
}
var Select = exports.Select = Object.assign(SelectRoot, {
  Trigger: _SelectTrigger.SelectTrigger,
  Value: _SelectValue.SelectValue,
  Content: _SelectContent.SelectContent,
  Group: _SelectGroup.SelectGroup,
  Label: _SelectLabel.SelectLabel,
  Item: _SelectItem.SelectItem,
  Separator: _SelectSeparator.SelectSeparator
});