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
    css: [_Editor.rootContainer, _Editor.editorListStyle, sx, process.env.NODE_ENV === "production" ? "" : ";label:EditorRoot;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FZGl0b3IvRWRpdG9yUm9vdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0NpQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvRWRpdG9yL0VkaXRvclJvb3QudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGVkaXRvckxpc3RTdHlsZSwgcm9vdENvbnRhaW5lciB9IGZyb20gJy4vRWRpdG9yLnN0eWxlJztcbmltcG9ydCB7IEVkaXRvckNvbnRleHQgfSBmcm9tICcuL0VkaXRvckNvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBSb290UHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuZnVuY3Rpb24gRWRpdG9yUm9vdCh7IGNoaWxkcmVuLCBzeCB9OiBSb290UHJvcHMpIHtcbiAgICAvLyBwcm9wIGRlc3RydWN0aW9uXG4gICAgLy8gbGliIGhvb2tzXG4gICAgLy8gaW5pdGlhbCB2YWx1ZXNcblxuICAgIC8vIHN0YXRlLCByZWYsIHF1ZXJ5c3RyaW5nIGhvb2tzXG4gICAgY29uc3QgZWRpdG9yUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgICBjb25zdCBbc2F2ZWRSYW5nZSwgc2V0U2F2ZWRSYW5nZV0gPSB1c2VTdGF0ZTxSYW5nZSB8IG51bGw+KG51bGwpO1xuXG4gICAgY29uc3QgY29udGV4dFZhbHVlID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gKHtcbiAgICAgICAgICAgIGVkaXRvclJlZixcbiAgICAgICAgICAgIHNhdmVkUmFuZ2UsXG4gICAgICAgICAgICBzZXRTYXZlZFJhbmdlLFxuICAgICAgICB9KSxcbiAgICAgICAgW3NhdmVkUmFuZ2VdLFxuICAgICk7XG5cbiAgICAvLyBmb3JtIGhvb2tzXG4gICAgLy8gcXVlcnkgaG9va3NcbiAgICAvLyBjYWxjdWxhdGVkIHZhbHVlc1xuICAgIC8vIGhhbmRsZXJzXG4gICAgLy8gZWZmZWN0c1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEVkaXRvckNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2NvbnRleHRWYWx1ZX0+XG4gICAgICAgICAgICA8ZGl2IGNzcz17W3Jvb3RDb250YWluZXIsIGVkaXRvckxpc3RTdHlsZSwgc3hdfT57Y2hpbGRyZW59PC9kaXY+XG4gICAgICAgIDwvRWRpdG9yQ29udGV4dC5Qcm92aWRlcj5cbiAgICApO1xufVxuXG5leHBvcnQgeyBFZGl0b3JSb290IH07XG4iXX0= */"]
  }, children));
}