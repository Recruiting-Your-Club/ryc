"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = Image;
var _react = _interopRequireDefault(require("react"));
var _Image = require("./Image.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Image(imageProps) {
  var {
    src,
    alt,
    width = '100%',
    height = '100%',
    radius = '10px',
    sx
  } = imageProps;
  return (0, _react2.jsx)("img", {
    src: src,
    alt: alt,
    width: width,
    height: height,
    css: [(0, _Image.imageContainer)(radius), sx, process.env.NODE_ENV === "production" ? "" : ";label:Image;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9JbWFnZS9JbWFnZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0IrRCIsImZpbGUiOiIuLi8uLi9zcmMvSW1hZ2UvSW1hZ2UudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgQ1NTT2JqZWN0IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgaW1hZ2VDb250YWluZXIgfSBmcm9tICcuL0ltYWdlLnN0eWxlJztcblxuaW50ZXJmYWNlIEltYWdlUHJvcHMgZXh0ZW5kcyBSZWFjdC5JbWdIVE1MQXR0cmlidXRlczxIVE1MSW1hZ2VFbGVtZW50PiB7XG4gICAgc3JjPzogc3RyaW5nO1xuICAgIHJhZGl1cz86IENTU09iamVjdFsnYm9yZGVyUmFkaXVzJ107XG4gICAgc3g/OiBDU1NPYmplY3Q7XG59XG5cbmZ1bmN0aW9uIEltYWdlKGltYWdlUHJvcHM6IEltYWdlUHJvcHMpIHtcbiAgICAvLyBwcm9wIGRlc3RydWN0aW9uXG4gICAgY29uc3QgeyBzcmMsIGFsdCwgd2lkdGggPSAnMTAwJScsIGhlaWdodCA9ICcxMDAlJywgcmFkaXVzID0gJzEwcHgnLCBzeCB9ID0gaW1hZ2VQcm9wcztcbiAgICAvLyBsaWIgaG9va3NcbiAgICAvLyBpbml0aWFsIHZhbHVlc1xuICAgIC8vIHN0YXRlLCByZWYsIHF1ZXJ5c3RyaW5nIGhvb2tzXG4gICAgLy8gZm9ybSBob29rc1xuICAgIC8vIHF1ZXJ5IGhvb2tzXG4gICAgLy8gY2FsY3VsYXRlZCB2YWx1ZXNcbiAgICAvLyBoYW5kbGVyc1xuICAgIC8vIGVmZmVjdHNcbiAgICByZXR1cm4gKFxuICAgICAgICA8aW1nIHNyYz17c3JjfSBhbHQ9e2FsdH0gd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gY3NzPXtbaW1hZ2VDb250YWluZXIocmFkaXVzKSwgc3hdfSAvPlxuICAgICk7XG59XG5leHBvcnQgeyBJbWFnZSB9O1xuIl19 */"]
  });
}