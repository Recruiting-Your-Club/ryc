"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextToggle = TextToggle;
var _react = _interopRequireDefault(require("react"));
var _Text = require("../Text");
var _TextToggle = require("./TextToggle.style");
var _react2 = require("@emotion/react");
var _excluded = ["isChecked", "handleToggle", "leftText", "rightText", "size", "sx"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var getTextType = {
  sm: 'subCaptionRegular',
  md: 'captionRegular',
  lg: 'bodyRegular'
};
function TextToggle(_ref) {
  var {
      isChecked = false,
      handleToggle,
      leftText = '지원사항',
      rightText = '내 정보',
      size = 'md',
      sx
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  return (0, _react2.jsx)("label", {
    css: [_TextToggle.toggleContainer, sx, process.env.NODE_ENV === "production" ? "" : ";label:TextToggle;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UZXh0VG9nZ2xlL1RleHRUb2dnbGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBCZSIsImZpbGUiOiIuLi8uLi8uLi9zcmMvVGV4dFRvZ2dsZS9UZXh0VG9nZ2xlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IFRleHQgfSBmcm9tICcuLi9UZXh0JztcbmltcG9ydCB7XG4gICAgaGlkZGVuQ2hlY2tib3gsXG4gICAgbGVmdFRleHRDb250YWluZXIsXG4gICAgcmlnaHRUZXh0Q29udGFpbmVyLFxuICAgIHRvZ2dsZUNvbnRhaW5lcixcbn0gZnJvbSAnLi9UZXh0VG9nZ2xlLnN0eWxlJztcbmltcG9ydCB0eXBlIHsgU2l6ZSwgVGV4dFR5cGUsIFRvZ2dsZVByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IGdldFRleHRUeXBlOiBSZWNvcmQ8U2l6ZSwgVGV4dFR5cGU+ID0ge1xuICAgIHNtOiAnc3ViQ2FwdGlvblJlZ3VsYXInLFxuICAgIG1kOiAnY2FwdGlvblJlZ3VsYXInLFxuICAgIGxnOiAnYm9keVJlZ3VsYXInLFxufTtcbmZ1bmN0aW9uIFRleHRUb2dnbGUoe1xuICAgIGlzQ2hlY2tlZCA9IGZhbHNlLFxuICAgIGhhbmRsZVRvZ2dsZSxcbiAgICBsZWZ0VGV4dCA9ICfsp4Dsm5Dsgqztla0nLFxuICAgIHJpZ2h0VGV4dCA9ICfrgrQg7KCV67O0JyxcbiAgICBzaXplID0gJ21kJyxcbiAgICBzeCxcbiAgICAuLi5wcm9wc1xufTogVG9nZ2xlUHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8bGFiZWwgY3NzPXtbdG9nZ2xlQ29udGFpbmVyLCBzeF19PlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICBjc3M9e2hpZGRlbkNoZWNrYm94fVxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2lzQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlVG9nZ2xlfVxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VGV4dCBhcz1cImRpdlwiIHR5cGU9e2dldFRleHRUeXBlW3NpemVdfSBzeD17bGVmdFRleHRDb250YWluZXIoaXNDaGVja2VkKX0+XG4gICAgICAgICAgICAgICAge2xlZnRUZXh0fVxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPFRleHQgYXM9XCJkaXZcIiB0eXBlPXtnZXRUZXh0VHlwZVtzaXplXX0gc3g9e3JpZ2h0VGV4dENvbnRhaW5lcihpc0NoZWNrZWQpfT5cbiAgICAgICAgICAgICAgICB7cmlnaHRUZXh0fVxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L2xhYmVsPlxuICAgICk7XG59XG5cbmV4cG9ydCB7IFRleHRUb2dnbGUgfTtcbiJdfQ== */"]
  }, (0, _react2.jsx)("input", _extends({
    type: "checkbox",
    css: _TextToggle.hiddenCheckbox,
    checked: isChecked,
    onChange: handleToggle
  }, props)), (0, _react2.jsx)(_Text.Text, {
    as: "div",
    type: getTextType[size],
    sx: (0, _TextToggle.leftTextContainer)(isChecked)
  }, leftText), (0, _react2.jsx)(_Text.Text, {
    as: "div",
    type: getTextType[size],
    sx: (0, _TextToggle.rightTextContainer)(isChecked)
  }, rightText));
}