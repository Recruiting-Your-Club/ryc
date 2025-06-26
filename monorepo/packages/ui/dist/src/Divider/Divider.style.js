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
  return (0, _react.css)("width:", WIDTH[width], ";height:0;border:0;margin:0;border-top:", WEIGHT[weight], " solid ", COLOR[color], ";" + (process.env.NODE_ENV === "production" ? "" : ";label:divider;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9EaXZpZGVyL0RpdmlkZXIuc3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUNjIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9EaXZpZGVyL0RpdmlkZXIuc3R5bGUudHMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB0aGVtZSBmcm9tICdAc3NvYy9zdHlsZXMnO1xuXG5pbXBvcnQgdHlwZSB7IERpdmlkZXJDb2xvciwgRGl2aWRlcldlaWdodCwgRGl2aWRlcldpZHRoIH0gZnJvbSAnLi9EaXZpZGVyJztcblxuY29uc3QgV0lEVEggPSB7XG4gICAgNzA6ICc3MCUnLFxuICAgIDgwOiAnODAlJyxcbiAgICA5MDogJzkwJScsXG4gICAgZnVsbDogJzEwMCUnLFxufTtcblxuY29uc3QgQ09MT1IgPSB7XG4gICAgYmxhY2s6IHRoZW1lLmNvbG9ycy5ibGFjayxcbiAgICBncmF5OiB0aGVtZS5jb2xvcnMuZ3JheVszMDBdLFxufTtcblxuY29uc3QgV0VJR0hUID0ge1xuICAgIDE6ICcwLjA2MjVyZW0nLFxuICAgIDI6ICcwLjEyNXJlbScsXG4gICAgMzogJzAuMTg3NXJlbScsXG59O1xuXG5leHBvcnQgY29uc3QgZGl2aWRlciA9ICh7XG4gICAgd2lkdGgsXG4gICAgY29sb3IsXG4gICAgd2VpZ2h0LFxufToge1xuICAgIHdpZHRoOiBEaXZpZGVyV2lkdGg7XG4gICAgY29sb3I6IERpdmlkZXJDb2xvcjtcbiAgICB3ZWlnaHQ6IERpdmlkZXJXZWlnaHQ7XG59KSA9PiB7XG4gICAgcmV0dXJuIGNzc2BcbiAgICAgICAgd2lkdGg6ICR7V0lEVEhbd2lkdGhdfTtcbiAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgYm9yZGVyLXRvcDogJHtXRUlHSFRbd2VpZ2h0XX0gc29saWQgJHtDT0xPUltjb2xvcl19O1xuICAgIGA7XG59O1xuIl19 */");
};
exports.divider = divider;