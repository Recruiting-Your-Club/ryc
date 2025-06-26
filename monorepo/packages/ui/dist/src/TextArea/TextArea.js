"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextArea = TextArea;
var _react = _interopRequireDefault(require("react"));
var _Text = require("../Text");
var _TextArea = require("./TextArea.style");
var _react2 = require("@emotion/react");
var _excluded = ["size", "variant", "width", "error", "errorText", "wrapperSx", "textAreaSx", "value", "maxLength", "disabled"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function TextArea(_ref) {
  var {
      size = 'md',
      variant = 'outline',
      width = '100%',
      error,
      errorText,
      wrapperSx,
      textAreaSx,
      value,
      maxLength,
      disabled
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  var currentLength = typeof value === 'string' ? value.length : 0;
  return (0, _react2.jsx)("div", {
    css: [(0, _TextArea.s_textAreaWrapper)(width), wrapperSx, process.env.NODE_ENV === "production" ? "" : ";label:TextArea;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UZXh0QXJlYS9UZXh0QXJlYS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0NhIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9UZXh0QXJlYS9UZXh0QXJlYS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB0eXBlIHsgVGV4dGFyZWFIVE1MQXR0cmlidXRlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IFRleHQgfSBmcm9tICcuLi9UZXh0JztcbmltcG9ydCB0eXBlIHsgVGV4dEFyZWFTaXplLCBUZXh0QXJlYVZhcmlhbnQgfSBmcm9tICcuL1RleHRBcmVhLnN0eWxlJztcbmltcG9ydCB7IHNfdGV4dEFyZWEsIHNfdGV4dEFyZWFJbmZvV3JhcHBlciwgc190ZXh0QXJlYVdyYXBwZXIgfSBmcm9tICcuL1RleHRBcmVhLnN0eWxlJztcblxuaW50ZXJmYWNlIFRleHRBcmVhUHJvcHMgZXh0ZW5kcyBUZXh0YXJlYUhUTUxBdHRyaWJ1dGVzPEhUTUxUZXh0QXJlYUVsZW1lbnQ+IHtcbiAgICBzaXplPzogVGV4dEFyZWFTaXplO1xuICAgIHZhcmlhbnQ/OiBUZXh0QXJlYVZhcmlhbnQ7XG4gICAgd2lkdGg/OiBzdHJpbmc7XG4gICAgZXJyb3I/OiBib29sZWFuO1xuICAgIGVycm9yVGV4dD86IHN0cmluZztcbiAgICB3cmFwcGVyU3g/OiBDU1NPYmplY3Q7XG4gICAgdGV4dEFyZWFTeD86IENTU09iamVjdDtcbn1cblxuZnVuY3Rpb24gVGV4dEFyZWEoe1xuICAgIHNpemUgPSAnbWQnLFxuICAgIHZhcmlhbnQgPSAnb3V0bGluZScsXG4gICAgd2lkdGggPSAnMTAwJScsXG4gICAgZXJyb3IsXG4gICAgZXJyb3JUZXh0LFxuICAgIHdyYXBwZXJTeCxcbiAgICB0ZXh0QXJlYVN4LFxuICAgIHZhbHVlLFxuICAgIG1heExlbmd0aCxcbiAgICBkaXNhYmxlZCxcbiAgICAuLi5wcm9wc1xufTogVGV4dEFyZWFQcm9wcykge1xuICAgIGNvbnN0IGN1cnJlbnRMZW5ndGggPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUubGVuZ3RoIDogMDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY3NzPXtbc190ZXh0QXJlYVdyYXBwZXIod2lkdGgpLCB3cmFwcGVyU3hdfT5cbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIGNzcz17W3NfdGV4dEFyZWEoc2l6ZSwgdmFyaWFudCwgZXJyb3IsIGRpc2FibGVkKSwgdGV4dEFyZWFTeF19XG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgICAgIG1heExlbmd0aD17bWF4TGVuZ3RofVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICB7ZXJyb3IgJiYgZXJyb3JUZXh0ICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNzcz17c190ZXh0QXJlYUluZm9XcmFwcGVyKCdsZWZ0Jyl9PlxuICAgICAgICAgICAgICAgICAgICA8VGV4dCB0eXBlPXsnc3ViQ2FwdGlvbkxpZ2h0J30gY29sb3I9eyd3YXJuaW5nJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZXJyb3JUZXh0fVxuICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7bWF4TGVuZ3RoICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNzcz17c190ZXh0QXJlYUluZm9XcmFwcGVyKCdyaWdodCcpfT5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgdHlwZT17J3N1YkNhcHRpb25MaWdodCd9IGNvbG9yPXsnaGVscGVyJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y3VycmVudExlbmd0aH0gLyB7bWF4TGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuZXhwb3J0IHsgVGV4dEFyZWEgfTtcbiJdfQ== */"]
  }, (0, _react2.jsx)("textarea", _extends({
    css: [(0, _TextArea.s_textArea)(size, variant, error, disabled), textAreaSx, process.env.NODE_ENV === "production" ? "" : ";label:TextArea;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UZXh0QXJlYS9UZXh0QXJlYS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0NnQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvVGV4dEFyZWEvVGV4dEFyZWEudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDU1NPYmplY3QgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IFRleHRhcmVhSFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnLi4vVGV4dCc7XG5pbXBvcnQgdHlwZSB7IFRleHRBcmVhU2l6ZSwgVGV4dEFyZWFWYXJpYW50IH0gZnJvbSAnLi9UZXh0QXJlYS5zdHlsZSc7XG5pbXBvcnQgeyBzX3RleHRBcmVhLCBzX3RleHRBcmVhSW5mb1dyYXBwZXIsIHNfdGV4dEFyZWFXcmFwcGVyIH0gZnJvbSAnLi9UZXh0QXJlYS5zdHlsZSc7XG5cbmludGVyZmFjZSBUZXh0QXJlYVByb3BzIGV4dGVuZHMgVGV4dGFyZWFIVE1MQXR0cmlidXRlczxIVE1MVGV4dEFyZWFFbGVtZW50PiB7XG4gICAgc2l6ZT86IFRleHRBcmVhU2l6ZTtcbiAgICB2YXJpYW50PzogVGV4dEFyZWFWYXJpYW50O1xuICAgIHdpZHRoPzogc3RyaW5nO1xuICAgIGVycm9yPzogYm9vbGVhbjtcbiAgICBlcnJvclRleHQ/OiBzdHJpbmc7XG4gICAgd3JhcHBlclN4PzogQ1NTT2JqZWN0O1xuICAgIHRleHRBcmVhU3g/OiBDU1NPYmplY3Q7XG59XG5cbmZ1bmN0aW9uIFRleHRBcmVhKHtcbiAgICBzaXplID0gJ21kJyxcbiAgICB2YXJpYW50ID0gJ291dGxpbmUnLFxuICAgIHdpZHRoID0gJzEwMCUnLFxuICAgIGVycm9yLFxuICAgIGVycm9yVGV4dCxcbiAgICB3cmFwcGVyU3gsXG4gICAgdGV4dEFyZWFTeCxcbiAgICB2YWx1ZSxcbiAgICBtYXhMZW5ndGgsXG4gICAgZGlzYWJsZWQsXG4gICAgLi4ucHJvcHNcbn06IFRleHRBcmVhUHJvcHMpIHtcbiAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlLmxlbmd0aCA6IDA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17W3NfdGV4dEFyZWFXcmFwcGVyKHdpZHRoKSwgd3JhcHBlclN4XX0+XG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICBjc3M9e1tzX3RleHRBcmVhKHNpemUsIHZhcmlhbnQsIGVycm9yLCBkaXNhYmxlZCksIHRleHRBcmVhU3hdfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICAgICAgICBtYXhMZW5ndGg9e21heExlbmd0aH1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAge2Vycm9yICYmIGVycm9yVGV4dCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjc3M9e3NfdGV4dEFyZWFJbmZvV3JhcHBlcignbGVmdCcpfT5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgdHlwZT17J3N1YkNhcHRpb25MaWdodCd9IGNvbG9yPXsnd2FybmluZyd9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2Vycm9yVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAge21heExlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjc3M9e3NfdGV4dEFyZWFJbmZvV3JhcHBlcigncmlnaHQnKX0+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IHR5cGU9eydzdWJDYXB0aW9uTGlnaHQnfSBjb2xvcj17J2hlbHBlcid9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2N1cnJlbnRMZW5ndGh9IC8ge21heExlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbmV4cG9ydCB7IFRleHRBcmVhIH07XG4iXX0= */"],
    value: value,
    maxLength: maxLength,
    disabled: disabled
  }, props)), error && errorText && (0, _react2.jsx)("div", {
    css: (0, _TextArea.s_textAreaInfoWrapper)('left')
  }, (0, _react2.jsx)(_Text.Text, {
    type: 'subCaptionLight',
    color: 'warning'
  }, errorText)), maxLength && (0, _react2.jsx)("div", {
    css: (0, _TextArea.s_textAreaInfoWrapper)('right')
  }, (0, _react2.jsx)(_Text.Text, {
    type: 'subCaptionLight',
    color: 'helper'
  }, currentLength, " / ", maxLength)));
}