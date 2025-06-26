"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardRoot = CardRoot;
var _react = _interopRequireDefault(require("react"));
var _Card = require("./Card.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CardRoot(_ref) {
  var {
    width = '35rem',
    radius = '0.3125rem',
    hover = false,
    customCss,
    children,
    onClick,
    onClickHandler
  } = _ref;
  return (0, _react2.jsx)("div", {
    onClick: onClick,
    onKeyDown: onClickHandler,
    css: [(0, _Card.baseCard)(width, radius, hover), customCss, process.env.NODE_ENV === "production" ? "" : ";label:CardRoot;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DYXJkL0NhcmRSb290LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQ1kiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0NhcmQvQ2FyZFJvb3QudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYmFzZUNhcmQgfSBmcm9tICcuL0NhcmQuc3R5bGUnO1xuXG5pbnRlcmZhY2UgQ2FyZFJvb3RQcm9wcyB7XG4gICAgd2lkdGg/OiBzdHJpbmc7XG4gICAgcmFkaXVzPzogc3RyaW5nO1xuICAgIGhvdmVyPzogYm9vbGVhbjtcbiAgICBjdXN0b21Dc3M/OiBTZXJpYWxpemVkU3R5bGVzO1xuICAgIGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlO1xuICAgIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICAgIG9uQ2xpY2tIYW5kbGVyPzogKCkgPT4gdm9pZDtcbn1cblxuZnVuY3Rpb24gQ2FyZFJvb3Qoe1xuICAgIHdpZHRoID0gJzM1cmVtJyxcbiAgICByYWRpdXMgPSAnMC4zMTI1cmVtJyxcbiAgICBob3ZlciA9IGZhbHNlLFxuICAgIGN1c3RvbUNzcyxcbiAgICBjaGlsZHJlbixcbiAgICBvbkNsaWNrLFxuICAgIG9uQ2xpY2tIYW5kbGVyLFxufTogQ2FyZFJvb3RQcm9wcykge1xuICAgIC8vIHByb3AgZGVzdHJ1Y3Rpb25cbiAgICAvLyBsaWIgaG9va3NcbiAgICAvLyBzdGF0ZSwgcmVmLCBxdWVyeXN0cmluZyBob29rc1xuICAgIC8vIGZvcm0gaG9va3NcbiAgICAvLyBxdWVyeSBob29rc1xuICAgIC8vIGNhbGN1bGF0ZWQgdmFsdWVzXG4gICAgLy8gZWZmZWN0c1xuICAgIC8vIGhhbmRsZXJzXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAgICAgb25LZXlEb3duPXtvbkNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAgIGNzcz17W2Jhc2VDYXJkKHdpZHRoLCByYWRpdXMsIGhvdmVyKSwgY3VzdG9tQ3NzXX1cbiAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgID5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IHsgQ2FyZFJvb3QgfTtcbiJdfQ== */"],
    tabIndex: 0,
    role: "button"
  }, children);
}