"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorRoot = EditorRoot;
var _react = _interopRequireWildcard(require("react"));
var _Editor = require("./Editor.style");
var _EditorContext = require("./EditorContext");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function EditorRoot(_ref) {
  var {
    children,
    sx
  } = _ref;
  var editorRef = (0, _react.useRef)(null);
  var [savedRange, setSavedRange] = (0, _react.useState)(null);
  var contextValue = (0, _react.useMemo)(() => ({
    editorRef,
    savedRange,
    setSavedRange
  }), [savedRange]);
  return (0, _react2.jsx)(_EditorContext.EditorContext.Provider, {
    value: contextValue
  }, (0, _react2.jsx)("div", {
    css: [_Editor.rootContainer, _Editor.editorListStyle, sx, process.env.NODE_ENV === "production" ? "" : ";label:EditorRoot;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9FZGl0b3IvRWRpdG9yUm9vdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0JpQiIsImZpbGUiOiIuLi8uLi9zcmMvRWRpdG9yL0VkaXRvclJvb3QudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBlZGl0b3JMaXN0U3R5bGUsIHJvb3RDb250YWluZXIgfSBmcm9tICcuL0VkaXRvci5zdHlsZSc7XG5pbXBvcnQgeyBFZGl0b3JDb250ZXh0IH0gZnJvbSAnLi9FZGl0b3JDb250ZXh0JztcbmltcG9ydCB0eXBlIHsgUm9vdFByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmZ1bmN0aW9uIEVkaXRvclJvb3QoeyBjaGlsZHJlbiwgc3ggfTogUm9vdFByb3BzKSB7XG4gICAgLy8gcHJvcCBkZXN0cnVjdGlvblxuICAgIC8vIGxpYiBob29rc1xuICAgIC8vIGluaXRpYWwgdmFsdWVzXG5cbiAgICAvLyBzdGF0ZSwgcmVmLCBxdWVyeXN0cmluZyBob29rc1xuICAgIGNvbnN0IGVkaXRvclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gICAgY29uc3QgW3NhdmVkUmFuZ2UsIHNldFNhdmVkUmFuZ2VdID0gdXNlU3RhdGU8UmFuZ2UgfCBudWxsPihudWxsKTtcblxuICAgIGNvbnN0IGNvbnRleHRWYWx1ZSA9IHVzZU1lbW8oXG4gICAgICAgICgpID0+ICh7XG4gICAgICAgICAgICBlZGl0b3JSZWYsXG4gICAgICAgICAgICBzYXZlZFJhbmdlLFxuICAgICAgICAgICAgc2V0U2F2ZWRSYW5nZSxcbiAgICAgICAgfSksXG4gICAgICAgIFtzYXZlZFJhbmdlXSxcbiAgICApO1xuXG4gICAgLy8gZm9ybSBob29rc1xuICAgIC8vIHF1ZXJ5IGhvb2tzXG4gICAgLy8gY2FsY3VsYXRlZCB2YWx1ZXNcbiAgICAvLyBoYW5kbGVyc1xuICAgIC8vIGVmZmVjdHNcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxFZGl0b3JDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtjb250ZXh0VmFsdWV9PlxuICAgICAgICAgICAgPGRpdiBjc3M9e1tyb290Q29udGFpbmVyLCBlZGl0b3JMaXN0U3R5bGUsIHN4XX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L0VkaXRvckNvbnRleHQuUHJvdmlkZXI+XG4gICAgKTtcbn1cblxuZXhwb3J0IHsgRWRpdG9yUm9vdCB9O1xuIl19 */"]
  }, children));
}