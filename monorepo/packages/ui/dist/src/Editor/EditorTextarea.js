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
    css: [(0, _Editor.textareaContainer)(height, radius), sx, process.env.NODE_ENV === "production" ? "" : ";label:EditorTextarea;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FZGl0b3IvRWRpdG9yVGV4dGFyZWEudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlDZ0IiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0VkaXRvci9FZGl0b3JUZXh0YXJlYS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB0ZXh0YXJlYUNvbnRhaW5lciB9IGZyb20gJy4vRWRpdG9yLnN0eWxlJztcbmltcG9ydCB7IHVzZUVkaXRvckNvbnRleHQgfSBmcm9tICcuL0VkaXRvckNvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBFZGl0b3JQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuXG5mdW5jdGlvbiBFZGl0b3JUZXh0YXJlYSh7IGhlaWdodCwgcmFkaXVzLCBzeCB9OiBFZGl0b3JQcm9wcykge1xuICAgIC8vIHByb3AgZGVzdHJ1Y3Rpb25cbiAgICAvLyBsaWIgaG9va3NcbiAgICAvLyBpbml0aWFsIHZhbHVlc1xuICAgIC8vIHN0YXRlLCByZWYsIHF1ZXJ5c3RyaW5nIGhvb2tzXG4gICAgY29uc3QgeyBlZGl0b3JSZWYsIHNldFNhdmVkUmFuZ2UgfSA9IHVzZUVkaXRvckNvbnRleHQoKTtcblxuICAgIC8vIGZvcm0gaG9va3NcbiAgICAvLyBxdWVyeSBob29rc1xuICAgIC8vIGNhbGN1bGF0ZWQgdmFsdWVzXG4gICAgLy8gaGFuZGxlcnNcbiAgICAvLyBlZmZlY3RzXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy8gdGV4dGFyZWEg64K07JeQIOyhtOyerO2VnCDrp4jsp4Drp4kg7Luk7IScIOq4sOyWteydhCDsnITtlZwg7ZWo7IiYXG4gICAgICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24gJiZcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24ucmFuZ2VDb3VudCA+IDAgJiZcbiAgICAgICAgICAgICAgICBlZGl0b3JSZWYuY3VycmVudD8uY29udGFpbnMoc2VsZWN0aW9uLmFuY2hvck5vZGUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zdCByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApLmNsb25lUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICBzZXRTYXZlZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVNb3VzZURvd24pO1xuICAgICAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlTW91c2VEb3duKTtcbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNvbnRlbnRFZGl0YWJsZVxuICAgICAgICAgICAgICAgIHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZ1xuICAgICAgICAgICAgICAgIGNzcz17W3RleHRhcmVhQ29udGFpbmVyKGhlaWdodCwgcmFkaXVzKSwgc3hdfVxuICAgICAgICAgICAgICAgIHJlZj17ZWRpdG9yUmVmfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgKTtcbn1cblxuZXhwb3J0IHsgRWRpdG9yVGV4dGFyZWEgfTtcbiJdfQ== */"],
    ref: editorRef
  }));
}