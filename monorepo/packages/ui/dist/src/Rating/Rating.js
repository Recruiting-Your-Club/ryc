"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rating = Rating;
var _react = _interopRequireWildcard(require("react"));
var _Rating = require("./Rating.style");
var _Star = require("./Star");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var TOTAL_STARS_DEFAULT = 5;
function Rating(_ref) {
  var {
    value = 0,
    size,
    totalStars = TOTAL_STARS_DEFAULT,
    type = 'click',
    onChange,
    customCSS
  } = _ref;
  var [hoverRating, setHoverRating] = (0, _react.useState)(value);
  var [rating, setRating] = (0, _react.useState)(value);
  var handleClick = index => {
    if (type === 'display') return;
    setRating(index);
    onChange === null || onChange === void 0 || onChange(index);
  };
  var handleMouseEnter = index => {
    if (type === 'display') return;
    setHoverRating(index);
  };
  var handleMouseLeave = () => {
    if (type === 'display') return;
    setHoverRating(null);
  };
  return (0, _react2.jsx)("div", {
    css: [_Rating.ratingContainer, customCSS, process.env.NODE_ENV === "production" ? "" : ";label:Rating;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SYXRpbmcvUmF0aW5nLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpRGEiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL1JhdGluZy9SYXRpbmcudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyByYXRpbmdDb250YWluZXIgfSBmcm9tICcuL1JhdGluZy5zdHlsZSc7XG5pbXBvcnQgdHlwZSB7IFN0YXJTaXplIH0gZnJvbSAnLi9TdGFyJztcbmltcG9ydCB7IFN0YXIgfSBmcm9tICcuL1N0YXInO1xuXG5jb25zdCBUT1RBTF9TVEFSU19ERUZBVUxUID0gNTtcblxuZXhwb3J0IGludGVyZmFjZSBSYXRpbmdQcm9wcyB7XG4gICAgdmFsdWU/OiBudW1iZXI7XG4gICAgc2l6ZT86IFN0YXJTaXplO1xuICAgIHRvdGFsU3RhcnM/OiBudW1iZXI7XG4gICAgdHlwZT86ICdjbGljaycgfCAnZGlzcGxheSc7XG4gICAgb25DaGFuZ2U/OiAocmF0aW5nOiBudW1iZXIpID0+IHZvaWQ7XG4gICAgY3VzdG9tQ1NTPzogU2VyaWFsaXplZFN0eWxlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJhdGluZyh7XG4gICAgdmFsdWUgPSAwLFxuICAgIHNpemUsXG4gICAgdG90YWxTdGFycyA9IFRPVEFMX1NUQVJTX0RFRkFVTFQsXG4gICAgdHlwZSA9ICdjbGljaycsXG4gICAgb25DaGFuZ2UsXG4gICAgY3VzdG9tQ1NTLFxufTogUmF0aW5nUHJvcHMpIHtcbiAgICBjb25zdCBbaG92ZXJSYXRpbmcsIHNldEhvdmVyUmF0aW5nXSA9IHVzZVN0YXRlPG51bWJlciB8IG51bGw+KHZhbHVlKTtcbiAgICBjb25zdCBbcmF0aW5nLCBzZXRSYXRpbmddID0gdXNlU3RhdGU8bnVtYmVyPih2YWx1ZSk7XG5cbiAgICBjb25zdCBoYW5kbGVDbGljayA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmICh0eXBlID09PSAnZGlzcGxheScpIHJldHVybjtcblxuICAgICAgICBzZXRSYXRpbmcoaW5kZXgpO1xuICAgICAgICBvbkNoYW5nZT8uKGluZGV4KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VFbnRlciA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmICh0eXBlID09PSAnZGlzcGxheScpIHJldHVybjtcblxuICAgICAgICBzZXRIb3ZlclJhdGluZyhpbmRleCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0eXBlID09PSAnZGlzcGxheScpIHJldHVybjtcblxuICAgICAgICBzZXRIb3ZlclJhdGluZyhudWxsKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e1tyYXRpbmdDb250YWluZXIsIGN1c3RvbUNTU119PlxuICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IHRvdGFsU3RhcnMgfSwgKF8sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhckluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzRmlsbGVkID0gKGhvdmVyUmF0aW5nIHx8IHJhdGluZykgPj0gc3RhckluZGV4O1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRpYWxGaWxsID0gKGhvdmVyUmF0aW5nIHx8IHJhdGluZykgLSBzdGFySW5kZXggKyAxO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPFN0YXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17c3RhckluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbGVkPXtpc0ZpbGxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpYWxGaWxsPXtwYXJ0aWFsRmlsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9e3NpemUgPz8gJ21kJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKHN0YXJJbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IGhhbmRsZU1vdXNlRW50ZXIoc3RhckluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17aGFuZGxlTW91c2VMZWF2ZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iXX0= */"]
  }, Array.from({
    length: totalStars
  }, (_, index) => {
    var starIndex = index + 1;
    var isFilled = (hoverRating || rating) >= starIndex;
    var partialFill = (hoverRating || rating) - starIndex + 1;
    return (0, _react2.jsx)(_Star.Star, {
      key: starIndex,
      filled: isFilled,
      partialFill: partialFill,
      size: size !== null && size !== void 0 ? size : 'md',
      onClick: () => handleClick(starIndex),
      onMouseEnter: () => handleMouseEnter(starIndex),
      onMouseLeave: handleMouseLeave
    });
  }));
}