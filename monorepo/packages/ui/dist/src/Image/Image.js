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
    css: [(0, _Image.imageContainer)(radius), sx, process.env.NODE_ENV === "production" ? "" : ";label:Image;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbWFnZS9JbWFnZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUIrRCIsImZpbGUiOiIuLi8uLi8uLi9zcmMvSW1hZ2UvSW1hZ2UudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDU1NPYmplY3QgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBpbWFnZUNvbnRhaW5lciB9IGZyb20gJy4vSW1hZ2Uuc3R5bGUnO1xuXG5pbnRlcmZhY2UgSW1hZ2VQcm9wcyBleHRlbmRzIFJlYWN0LkltZ0hUTUxBdHRyaWJ1dGVzPEhUTUxJbWFnZUVsZW1lbnQ+IHtcbiAgICBzcmM/OiBzdHJpbmc7XG4gICAgcmFkaXVzPzogQ1NTT2JqZWN0Wydib3JkZXJSYWRpdXMnXTtcbiAgICBzeD86IENTU09iamVjdDtcbn1cblxuZnVuY3Rpb24gSW1hZ2UoaW1hZ2VQcm9wczogSW1hZ2VQcm9wcykge1xuICAgIC8vIHByb3AgZGVzdHJ1Y3Rpb25cbiAgICBjb25zdCB7IHNyYywgYWx0LCB3aWR0aCA9ICcxMDAlJywgaGVpZ2h0ID0gJzEwMCUnLCByYWRpdXMgPSAnMTBweCcsIHN4IH0gPSBpbWFnZVByb3BzO1xuICAgIC8vIGxpYiBob29rc1xuICAgIC8vIGluaXRpYWwgdmFsdWVzXG4gICAgLy8gc3RhdGUsIHJlZiwgcXVlcnlzdHJpbmcgaG9va3NcbiAgICAvLyBmb3JtIGhvb2tzXG4gICAgLy8gcXVlcnkgaG9va3NcbiAgICAvLyBjYWxjdWxhdGVkIHZhbHVlc1xuICAgIC8vIGhhbmRsZXJzXG4gICAgLy8gZWZmZWN0c1xuICAgIHJldHVybiAoXG4gICAgICAgIDxpbWcgc3JjPXtzcmN9IGFsdD17YWx0fSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBjc3M9e1tpbWFnZUNvbnRhaW5lcihyYWRpdXMpLCBzeF19IC8+XG4gICAgKTtcbn1cbmV4cG9ydCB7IEltYWdlIH07XG4iXX0= */"]
  });
}