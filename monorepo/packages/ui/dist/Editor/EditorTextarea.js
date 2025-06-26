"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorTextarea = EditorTextarea;
var _react = _interopRequireWildcard(require("react"));
var _Editor = require("./Editor.style");
var _EditorContext = require("./EditorContext");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function EditorTextarea(_ref) {
  var {
    height,
    radius,
    sx
  } = _ref;
  var {
    editorRef,
    setSavedRange
  } = (0, _EditorContext.useEditorContext)();
  (0, _react.useEffect)(() => {
    var handleMouseDown = () => {
      var _editorRef$current;
      var selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && (_editorRef$current = editorRef.current) !== null && _editorRef$current !== void 0 && _editorRef$current.contains(selection.anchorNode)) {
        var range = selection.getRangeAt(0).cloneRange();
        setSavedRange(range);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("div", {
    contentEditable: true,
    suppressContentEditableWarning: true,
    css: [(0, _Editor.textareaContainer)(height, radius), sx, process.env.NODE_ENV === "production" ? "" : ";label:EditorTextarea;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9FZGl0b3IvRWRpdG9yVGV4dGFyZWEudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdDZ0IiLCJmaWxlIjoiLi4vLi4vc3JjL0VkaXRvci9FZGl0b3JUZXh0YXJlYS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdGV4dGFyZWFDb250YWluZXIgfSBmcm9tICcuL0VkaXRvci5zdHlsZSc7XG5pbXBvcnQgeyB1c2VFZGl0b3JDb250ZXh0IH0gZnJvbSAnLi9FZGl0b3JDb250ZXh0JztcbmltcG9ydCB0eXBlIHsgRWRpdG9yUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuZnVuY3Rpb24gRWRpdG9yVGV4dGFyZWEoeyBoZWlnaHQsIHJhZGl1cywgc3ggfTogRWRpdG9yUHJvcHMpIHtcbiAgICAvLyBwcm9wIGRlc3RydWN0aW9uXG4gICAgLy8gbGliIGhvb2tzXG4gICAgLy8gaW5pdGlhbCB2YWx1ZXNcbiAgICAvLyBzdGF0ZSwgcmVmLCBxdWVyeXN0cmluZyBob29rc1xuICAgIGNvbnN0IHsgZWRpdG9yUmVmLCBzZXRTYXZlZFJhbmdlIH0gPSB1c2VFZGl0b3JDb250ZXh0KCk7XG5cbiAgICAvLyBmb3JtIGhvb2tzXG4gICAgLy8gcXVlcnkgaG9va3NcbiAgICAvLyBjYWxjdWxhdGVkIHZhbHVlc1xuICAgIC8vIGhhbmRsZXJzXG4gICAgLy8gZWZmZWN0c1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIHRleHRhcmVhIOuCtOyXkCDsobTsnqztlZwg66eI7KeA66eJIOy7pOyEnCDquLDslrXsnYQg7JyE7ZWcIO2VqOyImFxuICAgICAgICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uICYmXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLnJhbmdlQ291bnQgPiAwICYmXG4gICAgICAgICAgICAgICAgZWRpdG9yUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHNlbGVjdGlvbi5hbmNob3JOb2RlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKS5jbG9uZVJhbmdlKCk7XG4gICAgICAgICAgICAgICAgc2V0U2F2ZWRSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlTW91c2VEb3duKTtcbiAgICAgICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZU1vdXNlRG93bik7XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjb250ZW50RWRpdGFibGVcbiAgICAgICAgICAgICAgICBzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmdcbiAgICAgICAgICAgICAgICBjc3M9e1t0ZXh0YXJlYUNvbnRhaW5lcihoZWlnaHQsIHJhZGl1cyksIHN4XX1cbiAgICAgICAgICAgICAgICByZWY9e2VkaXRvclJlZn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvPlxuICAgICk7XG59XG5cbmV4cG9ydCB7IEVkaXRvclRleHRhcmVhIH07XG4iXX0= */"],
    ref: editorRef
  }));
}