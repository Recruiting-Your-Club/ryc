"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextArea = TextArea;
var _react = _interopRequireDefault(require("react"));
var _TextArea = require("./TextArea.style");
var _Text = require("../Text");
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
    css: [(0, _TextArea.s_textAreaWrapper)(width), wrapperSx, process.env.NODE_ENV === "production" ? "" : ";label:TextArea;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZXh0QXJlYS9UZXh0QXJlYS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUNhIiwiZmlsZSI6Ii4uLy4uL3NyYy9UZXh0QXJlYS9UZXh0QXJlYS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFRleHRhcmVhSFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBUZXh0QXJlYVNpemUsIFRleHRBcmVhVmFyaWFudCB9IGZyb20gJy4vVGV4dEFyZWEuc3R5bGUnO1xuaW1wb3J0IHsgc190ZXh0QXJlYVdyYXBwZXIsIHNfdGV4dEFyZWEsIHNfdGV4dEFyZWFJbmZvV3JhcHBlciB9IGZyb20gJy4vVGV4dEFyZWEuc3R5bGUnO1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4uL1RleHQnO1xuaW1wb3J0IHR5cGUgeyBDU1NPYmplY3QgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmludGVyZmFjZSBUZXh0QXJlYVByb3BzIGV4dGVuZHMgVGV4dGFyZWFIVE1MQXR0cmlidXRlczxIVE1MVGV4dEFyZWFFbGVtZW50PiB7XG4gICAgc2l6ZT86IFRleHRBcmVhU2l6ZTtcbiAgICB2YXJpYW50PzogVGV4dEFyZWFWYXJpYW50O1xuICAgIHdpZHRoPzogc3RyaW5nO1xuICAgIGVycm9yPzogYm9vbGVhbjtcbiAgICBlcnJvclRleHQ/OiBzdHJpbmc7XG4gICAgd3JhcHBlclN4PzogQ1NTT2JqZWN0O1xuICAgIHRleHRBcmVhU3g/OiBDU1NPYmplY3Q7XG59XG5cbmZ1bmN0aW9uIFRleHRBcmVhKHtcbiAgICBzaXplID0gJ21kJyxcbiAgICB2YXJpYW50ID0gJ291dGxpbmUnLFxuICAgIHdpZHRoID0gJzEwMCUnLFxuICAgIGVycm9yLFxuICAgIGVycm9yVGV4dCxcbiAgICB3cmFwcGVyU3gsXG4gICAgdGV4dEFyZWFTeCxcbiAgICB2YWx1ZSxcbiAgICBtYXhMZW5ndGgsXG4gICAgZGlzYWJsZWQsXG4gICAgLi4ucHJvcHNcbn06IFRleHRBcmVhUHJvcHMpIHtcbiAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlLmxlbmd0aCA6IDA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17W3NfdGV4dEFyZWFXcmFwcGVyKHdpZHRoKSwgd3JhcHBlclN4XX0+XG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICBjc3M9e1tzX3RleHRBcmVhKHNpemUsIHZhcmlhbnQsIGVycm9yLCBkaXNhYmxlZCksIHRleHRBcmVhU3hdfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICAgICAgICBtYXhMZW5ndGg9e21heExlbmd0aH1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAge2Vycm9yICYmIGVycm9yVGV4dCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjc3M9e3NfdGV4dEFyZWFJbmZvV3JhcHBlcignbGVmdCcpfT5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgdHlwZT17J3N1YkNhcHRpb25MaWdodCd9IGNvbG9yPXsnd2FybmluZyd9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2Vycm9yVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAge21heExlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjc3M9e3NfdGV4dEFyZWFJbmZvV3JhcHBlcigncmlnaHQnKX0+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IHR5cGU9eydzdWJDYXB0aW9uTGlnaHQnfSBjb2xvcj17J2hlbHBlcid9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2N1cnJlbnRMZW5ndGh9IC8ge21heExlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbmV4cG9ydCB7IFRleHRBcmVhIH07XG4iXX0= */"]
  }, (0, _react2.jsx)("textarea", _extends({
    css: [(0, _TextArea.s_textArea)(size, variant, error, disabled), textAreaSx, process.env.NODE_ENV === "production" ? "" : ";label:TextArea;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZXh0QXJlYS9UZXh0QXJlYS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUNnQiIsImZpbGUiOiIuLi8uLi9zcmMvVGV4dEFyZWEvVGV4dEFyZWEudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBUZXh0YXJlYUhUTUxBdHRyaWJ1dGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgVGV4dEFyZWFTaXplLCBUZXh0QXJlYVZhcmlhbnQgfSBmcm9tICcuL1RleHRBcmVhLnN0eWxlJztcbmltcG9ydCB7IHNfdGV4dEFyZWFXcmFwcGVyLCBzX3RleHRBcmVhLCBzX3RleHRBcmVhSW5mb1dyYXBwZXIgfSBmcm9tICcuL1RleHRBcmVhLnN0eWxlJztcbmltcG9ydCB7IFRleHQgfSBmcm9tICcuLi9UZXh0JztcbmltcG9ydCB0eXBlIHsgQ1NTT2JqZWN0IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5pbnRlcmZhY2UgVGV4dEFyZWFQcm9wcyBleHRlbmRzIFRleHRhcmVhSFRNTEF0dHJpYnV0ZXM8SFRNTFRleHRBcmVhRWxlbWVudD4ge1xuICAgIHNpemU/OiBUZXh0QXJlYVNpemU7XG4gICAgdmFyaWFudD86IFRleHRBcmVhVmFyaWFudDtcbiAgICB3aWR0aD86IHN0cmluZztcbiAgICBlcnJvcj86IGJvb2xlYW47XG4gICAgZXJyb3JUZXh0Pzogc3RyaW5nO1xuICAgIHdyYXBwZXJTeD86IENTU09iamVjdDtcbiAgICB0ZXh0QXJlYVN4PzogQ1NTT2JqZWN0O1xufVxuXG5mdW5jdGlvbiBUZXh0QXJlYSh7XG4gICAgc2l6ZSA9ICdtZCcsXG4gICAgdmFyaWFudCA9ICdvdXRsaW5lJyxcbiAgICB3aWR0aCA9ICcxMDAlJyxcbiAgICBlcnJvcixcbiAgICBlcnJvclRleHQsXG4gICAgd3JhcHBlclN4LFxuICAgIHRleHRBcmVhU3gsXG4gICAgdmFsdWUsXG4gICAgbWF4TGVuZ3RoLFxuICAgIGRpc2FibGVkLFxuICAgIC4uLnByb3BzXG59OiBUZXh0QXJlYVByb3BzKSB7XG4gICAgY29uc3QgY3VycmVudExlbmd0aCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZS5sZW5ndGggOiAwO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e1tzX3RleHRBcmVhV3JhcHBlcih3aWR0aCksIHdyYXBwZXJTeF19PlxuICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgY3NzPXtbc190ZXh0QXJlYShzaXplLCB2YXJpYW50LCBlcnJvciwgZGlzYWJsZWQpLCB0ZXh0QXJlYVN4XX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXttYXhMZW5ndGh9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIHtlcnJvciAmJiBlcnJvclRleHQgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtzX3RleHRBcmVhSW5mb1dyYXBwZXIoJ2xlZnQnKX0+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IHR5cGU9eydzdWJDYXB0aW9uTGlnaHQnfSBjb2xvcj17J3dhcm5pbmcnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlcnJvclRleHR9XG4gICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHttYXhMZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtzX3RleHRBcmVhSW5mb1dyYXBwZXIoJ3JpZ2h0Jyl9PlxuICAgICAgICAgICAgICAgICAgICA8VGV4dCB0eXBlPXsnc3ViQ2FwdGlvbkxpZ2h0J30gY29sb3I9eydoZWxwZXInfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjdXJyZW50TGVuZ3RofSAvIHttYXhMZW5ndGh9XG4gICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5leHBvcnQgeyBUZXh0QXJlYSB9O1xuIl19 */"],
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