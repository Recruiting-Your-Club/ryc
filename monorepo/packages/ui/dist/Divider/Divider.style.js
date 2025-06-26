"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.divider = void 0;
var _react = require("@emotion/react");
var _styles = _interopRequireDefault(require("@ssoc/styles"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var WIDTH = {
  70: '70%',
  80: '80%',
  90: '90%',
  full: '100%'
};
var COLOR = {
  black: _styles.default.colors.black,
  gray: _styles.default.colors.gray[300]
};
var WEIGHT = {
  1: '0.0625rem',
  2: '0.125rem',
  3: '0.1875rem'
};
var divider = _ref => {
  var {
    width,
    color,
    weight
  } = _ref;
  return (0, _react.css)("width:", WIDTH[width], ";height:0;border:0;margin:0;border-top:", WEIGHT[weight], " solid ", COLOR[color], ";" + (process.env.NODE_ENV === "production" ? "" : ";label:divider;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EaXZpZGVyL0RpdmlkZXIuc3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0JjIiwiZmlsZSI6Ii4uLy4uL3NyYy9EaXZpZGVyL0RpdmlkZXIuc3R5bGUudHMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgdGhlbWUgZnJvbSAnQHNzb2Mvc3R5bGVzJztcbmltcG9ydCB0eXBlIHsgRGl2aWRlckNvbG9yLCBEaXZpZGVyV2VpZ2h0LCBEaXZpZGVyV2lkdGggfSBmcm9tICcuL0RpdmlkZXInO1xuXG5jb25zdCBXSURUSCA9IHtcbiAgICA3MDogJzcwJScsXG4gICAgODA6ICc4MCUnLFxuICAgIDkwOiAnOTAlJyxcbiAgICBmdWxsOiAnMTAwJScsXG59O1xuXG5jb25zdCBDT0xPUiA9IHtcbiAgICBibGFjazogdGhlbWUuY29sb3JzLmJsYWNrLFxuICAgIGdyYXk6IHRoZW1lLmNvbG9ycy5ncmF5WzMwMF0sXG59O1xuXG5jb25zdCBXRUlHSFQgPSB7XG4gICAgMTogJzAuMDYyNXJlbScsXG4gICAgMjogJzAuMTI1cmVtJyxcbiAgICAzOiAnMC4xODc1cmVtJyxcbn07XG5cbmV4cG9ydCBjb25zdCBkaXZpZGVyID0gKHtcbiAgICB3aWR0aCxcbiAgICBjb2xvcixcbiAgICB3ZWlnaHQsXG59OiB7XG4gICAgd2lkdGg6IERpdmlkZXJXaWR0aDtcbiAgICBjb2xvcjogRGl2aWRlckNvbG9yO1xuICAgIHdlaWdodDogRGl2aWRlcldlaWdodDtcbn0pID0+IHtcbiAgICByZXR1cm4gY3NzYFxuICAgICAgICB3aWR0aDogJHtXSURUSFt3aWR0aF19O1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBib3JkZXItdG9wOiAke1dFSUdIVFt3ZWlnaHRdfSBzb2xpZCAke0NPTE9SW2NvbG9yXX07XG4gICAgYDtcbn07XG4iXX0= */");
};
exports.divider = divider;