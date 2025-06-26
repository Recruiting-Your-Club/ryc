"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rating = Rating;
var _react = _interopRequireWildcard(require("react"));
var _Star = require("./Star");
var _Rating = require("./Rating.style");
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
    css: [_Rating.ratingContainer, customCSS, process.env.NODE_ENV === "production" ? "" : ";label:Rating;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SYXRpbmcvUmF0aW5nLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnRGEiLCJmaWxlIjoiLi4vLi4vc3JjL1JhdGluZy9SYXRpbmcudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBTdGFyU2l6ZSB9IGZyb20gJy4vU3Rhcic7XG5pbXBvcnQgeyBTdGFyIH0gZnJvbSAnLi9TdGFyJztcbmltcG9ydCB7IHJhdGluZ0NvbnRhaW5lciB9IGZyb20gJy4vUmF0aW5nLnN0eWxlJztcblxuY29uc3QgVE9UQUxfU1RBUlNfREVGQVVMVCA9IDU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF0aW5nUHJvcHMge1xuICAgIHZhbHVlPzogbnVtYmVyO1xuICAgIHNpemU/OiBTdGFyU2l6ZTtcbiAgICB0b3RhbFN0YXJzPzogbnVtYmVyO1xuICAgIHR5cGU/OiAnY2xpY2snIHwgJ2Rpc3BsYXknO1xuICAgIG9uQ2hhbmdlPzogKHJhdGluZzogbnVtYmVyKSA9PiB2b2lkO1xuICAgIGN1c3RvbUNTUz86IFNlcmlhbGl6ZWRTdHlsZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSYXRpbmcoe1xuICAgIHZhbHVlID0gMCxcbiAgICBzaXplLFxuICAgIHRvdGFsU3RhcnMgPSBUT1RBTF9TVEFSU19ERUZBVUxULFxuICAgIHR5cGUgPSAnY2xpY2snLFxuICAgIG9uQ2hhbmdlLFxuICAgIGN1c3RvbUNTUyxcbn06IFJhdGluZ1Byb3BzKSB7XG4gICAgY29uc3QgW2hvdmVyUmF0aW5nLCBzZXRIb3ZlclJhdGluZ10gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPih2YWx1ZSk7XG4gICAgY29uc3QgW3JhdGluZywgc2V0UmF0aW5nXSA9IHVzZVN0YXRlPG51bWJlcj4odmFsdWUpO1xuXG4gICAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2Rpc3BsYXknKSByZXR1cm47XG5cbiAgICAgICAgc2V0UmF0aW5nKGluZGV4KTtcbiAgICAgICAgb25DaGFuZ2U/LihpbmRleCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRW50ZXIgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2Rpc3BsYXknKSByZXR1cm47XG5cbiAgICAgICAgc2V0SG92ZXJSYXRpbmcoaW5kZXgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZUxlYXZlID0gKCkgPT4ge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2Rpc3BsYXknKSByZXR1cm47XG5cbiAgICAgICAgc2V0SG92ZXJSYXRpbmcobnVsbCk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY3NzPXtbcmF0aW5nQ29udGFpbmVyLCBjdXN0b21DU1NdfT5cbiAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiB0b3RhbFN0YXJzIH0sIChfLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJJbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0ZpbGxlZCA9IChob3ZlclJhdGluZyB8fCByYXRpbmcpID49IHN0YXJJbmRleDtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0aWFsRmlsbCA9IChob3ZlclJhdGluZyB8fCByYXRpbmcpIC0gc3RhckluZGV4ICsgMTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxTdGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3N0YXJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxlZD17aXNGaWxsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsRmlsbD17cGFydGlhbEZpbGx9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplPXtzaXplID8/ICdtZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGljayhzdGFySW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBoYW5kbGVNb3VzZUVudGVyKHN0YXJJbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9e2hhbmRsZU1vdXNlTGVhdmV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIl19 */"]
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