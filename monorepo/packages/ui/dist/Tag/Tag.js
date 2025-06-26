"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tag = Tag;
var _react = _interopRequireDefault(require("react"));
var _Tag = require("./Tag.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Tag(_ref) {
  var {
    text = 'sample',
    variant = 'primary',
    sx
  } = _ref;
  return (0, _react2.jsx)("div", null, (0, _react2.jsx)("span", {
    css: [(0, _Tag.tag)(variant), sx, process.env.NODE_ENV === "production" ? "" : ";label:Tag;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UYWcvVGFnLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFja0IiLCJmaWxlIjoiLi4vLi4vc3JjL1RhZy9UYWcudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRhZyB9IGZyb20gJy4vVGFnLnN0eWxlJztcbmltcG9ydCB0eXBlIHsgQ1NTT2JqZWN0IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgdHlwZSB0YWdWYXJpYW50ID0gJ3ByaW1hcnknIHwgJ3Byb2dyZXNzJyB8ICdlbmQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRhZ1Byb3BzIHtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgdmFyaWFudDogdGFnVmFyaWFudDtcbiAgICBzeD86IENTU09iamVjdDtcbn1cbmZ1bmN0aW9uIFRhZyh7IHRleHQgPSAnc2FtcGxlJywgdmFyaWFudCA9ICdwcmltYXJ5Jywgc3ggfTogVGFnUHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHNwYW4gY3NzPXtbdGFnKHZhcmlhbnQpLCBzeF19Pnt0ZXh0fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbmV4cG9ydCB7IFRhZyB9O1xuIl19 */"]
  }, text));
}