"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextToggle = TextToggle;
var _react = _interopRequireDefault(require("react"));
var _TextToggle = require("./TextToggle.style");
var _Text = require("../Text");
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
    css: [_TextToggle.toggleContainer, sx, process.env.NODE_ENV === "production" ? "" : ";label:TextToggle;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZXh0VG9nZ2xlL1RleHRUb2dnbGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCZSIsImZpbGUiOiIuLi8uLi9zcmMvVGV4dFRvZ2dsZS9UZXh0VG9nZ2xlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICAgIGhpZGRlbkNoZWNrYm94LFxuICAgIHRvZ2dsZUNvbnRhaW5lcixcbiAgICBsZWZ0VGV4dENvbnRhaW5lcixcbiAgICByaWdodFRleHRDb250YWluZXIsXG59IGZyb20gJy4vVGV4dFRvZ2dsZS5zdHlsZSc7XG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnLi4vVGV4dCc7XG5pbXBvcnQgdHlwZSB7IFRvZ2dsZVByb3BzLCBTaXplLCBUZXh0VHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBnZXRUZXh0VHlwZTogUmVjb3JkPFNpemUsIFRleHRUeXBlPiA9IHtcbiAgICBzbTogJ3N1YkNhcHRpb25SZWd1bGFyJyxcbiAgICBtZDogJ2NhcHRpb25SZWd1bGFyJyxcbiAgICBsZzogJ2JvZHlSZWd1bGFyJyxcbn07XG5mdW5jdGlvbiBUZXh0VG9nZ2xlKHtcbiAgICBpc0NoZWNrZWQgPSBmYWxzZSxcbiAgICBoYW5kbGVUb2dnbGUsXG4gICAgbGVmdFRleHQgPSAn7KeA7JuQ7IKs7ZWtJyxcbiAgICByaWdodFRleHQgPSAn64K0IOygleuztCcsXG4gICAgc2l6ZSA9ICdtZCcsXG4gICAgc3gsXG4gICAgLi4ucHJvcHNcbn06IFRvZ2dsZVByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGxhYmVsIGNzcz17W3RvZ2dsZUNvbnRhaW5lciwgc3hdfT5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgY3NzPXtoaWRkZW5DaGVja2JveH1cbiAgICAgICAgICAgICAgICBjaGVja2VkPXtpc0NoZWNrZWR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVRvZ2dsZX1cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFRleHQgYXM9XCJkaXZcIiB0eXBlPXtnZXRUZXh0VHlwZVtzaXplXX0gc3g9e2xlZnRUZXh0Q29udGFpbmVyKGlzQ2hlY2tlZCl9PlxuICAgICAgICAgICAgICAgIHtsZWZ0VGV4dH1cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDxUZXh0IGFzPVwiZGl2XCIgdHlwZT17Z2V0VGV4dFR5cGVbc2l6ZV19IHN4PXtyaWdodFRleHRDb250YWluZXIoaXNDaGVja2VkKX0+XG4gICAgICAgICAgICAgICAge3JpZ2h0VGV4dH1cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgPC9sYWJlbD5cbiAgICApO1xufVxuXG5leHBvcnQgeyBUZXh0VG9nZ2xlIH07XG4iXX0= */"]
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