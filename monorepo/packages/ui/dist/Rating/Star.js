"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Star = Star;
var _react = _interopRequireDefault(require("react"));
var _Rating = require("./Rating.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var STAR_PATH = 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';
var STAR_VIEWBOX = '0 0 24 24';
function StarSVG() {
  return (0, _react2.jsx)("svg", {
    viewBox: STAR_VIEWBOX
  }, (0, _react2.jsx)("path", {
    d: STAR_PATH
  }));
}
function Star(_ref) {
  var {
    filled,
    partialFill,
    size,
    customCSS,
    onClick,
    onMouseEnter,
    onMouseLeave
  } = _ref;
  var cssProp = [(0, _Rating.s_size)(size), (0, _Rating.s_star)(filled)];
  return (0, _react2.jsx)("button", {
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    css: [cssProp, customCSS, process.env.NODE_ENV === "production" ? "" : ";label:Star;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SYXRpbmcvU3Rhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkNZIiwiZmlsZSI6Ii4uLy4uL3NyYy9SYXRpbmcvU3Rhci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgc19oYWxmU3Rhciwgc19zaXplLCBzX3N0YXIgfSBmcm9tICcuL1JhdGluZy5zdHlsZSc7XG5cbmV4cG9ydCB0eXBlIFN0YXJTaXplID0gJ3hzJyB8ICdzJyB8ICdtZCcgfCAnbGcnIHwgJ3hsJztcbmNvbnN0IFNUQVJfUEFUSCA9XG4gICAgJ00xMiAxNy4yN0wxOC4xOCAyMWwtMS42NC03LjAzTDIyIDkuMjRsLTcuMTktLjYxTDEyIDIgOS4xOSA4LjYzIDIgOS4yNGw1LjQ2IDQuNzNMNS44MiAyMXonO1xuY29uc3QgU1RBUl9WSUVXQk9YID0gJzAgMCAyNCAyNCc7XG5cbmludGVyZmFjZSBTdGFyUHJvcHMge1xuICAgIGZpbGxlZDogYm9vbGVhbjtcbiAgICBwYXJ0aWFsRmlsbD86IG51bWJlcjtcbiAgICBzaXplOiBTdGFyU2l6ZTtcbiAgICBjdXN0b21DU1M/OiBTZXJpYWxpemVkU3R5bGVzO1xuICAgIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICAgIG9uTW91c2VFbnRlcj86ICgpID0+IHZvaWQ7XG4gICAgb25Nb3VzZUxlYXZlPzogKCkgPT4gdm9pZDtcbn1cblxuZnVuY3Rpb24gU3RhclNWRygpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c3ZnIHZpZXdCb3g9e1NUQVJfVklFV0JPWH0+XG4gICAgICAgICAgICA8cGF0aCBkPXtTVEFSX1BBVEh9IC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTdGFyKHtcbiAgICBmaWxsZWQsXG4gICAgcGFydGlhbEZpbGwsXG4gICAgc2l6ZSxcbiAgICBjdXN0b21DU1MsXG4gICAgb25DbGljayxcbiAgICBvbk1vdXNlRW50ZXIsXG4gICAgb25Nb3VzZUxlYXZlLFxufTogU3RhclByb3BzKSB7XG4gICAgY29uc3QgY3NzUHJvcCA9IFtzX3NpemUoc2l6ZSksIHNfc3RhcihmaWxsZWQpXTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e29uTW91c2VFbnRlcn1cbiAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17b25Nb3VzZUxlYXZlfVxuICAgICAgICAgICAgY3NzPXtbY3NzUHJvcCwgY3VzdG9tQ1NTXX1cbiAgICAgICAgPlxuICAgICAgICAgICAgPFN0YXJTVkcgLz5cblxuICAgICAgICAgICAge3BhcnRpYWxGaWxsICYmIHBhcnRpYWxGaWxsID4gMCAmJiBwYXJ0aWFsRmlsbCA8IDEgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjc3M9e3NfaGFsZlN0YXIocGFydGlhbEZpbGwgKiAxMDApfT5cbiAgICAgICAgICAgICAgICAgICAgPFN0YXJTVkcgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICApO1xufVxuIl19 */"]
  }, (0, _react2.jsx)(StarSVG, null), partialFill && partialFill > 0 && partialFill < 1 ? (0, _react2.jsx)("div", {
    css: (0, _Rating.s_halfStar)(partialFill * 100)
  }, (0, _react2.jsx)(StarSVG, null)) : null);
}